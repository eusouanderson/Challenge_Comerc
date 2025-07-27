<template>
  <Header />
  <div class="p-8 font-sans text-gray-800">
    <FeedbackMessage v-if="showSavedFeedback" message="Movie saved successfully!" type="success" />

    <MovieSearch v-model:modelValue="searchTitle" @search="searchMovies" />

    <div class="bg-gray-50 rounded-lg shadow p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Search Results
      </h2>

      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-700 font-semibold">Sort by Year:</span>
        <button
          @click="toggleSortOrder"
          class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {{ sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓' }}
        </button>
      </div>

      <MovieList v-if="sortedSearchResults.length > 0">
        <MovieCard
          v-for="movie in sortedSearchResults"
          :key="movie.imdbID"
          :title="movie.Title"
          :year="movie.Year"
          :poster="movie.Poster"
        >
          <button
            @click="saveMovie(movie)"
            class="w-full px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="savingMovie === movie.imdbID"
          >
            {{ savingMovie === movie.imdbID ? 'Saving...' : 'Save' }}
          </button>
        </MovieCard>
      </MovieList>

      <p v-else-if="searchAttempted" class="text-center text-gray-600 italic">
        No movies found. Try a different search.
      </p>
      <p v-else class="text-center text-gray-600 italic">No movies found. Try a search above.</p>
    </div>

    <div class="bg-gray-50 rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Saved Movies
      </h2>
      <MovieViewToggle :current-view="currentView" @view-changed="handleViewChange" />

      <div v-if="loading" class="text-center py-8 text-gray-600">Loading...</div>
      <div v-else>
        <MovieList v-if="savedMovies?.length > 0">
          <MovieCard
            v-for="movie in savedMovies"
            :key="movie.imdbID"
            :title="movie.Title"
            :year="movie.Year"
            :poster="movie.Poster"
          >
            <button
              @click="deleteMovie(movie.imdbID)"
              class="w-full px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="deletingMovie === movie.imdbID"
            >
              {{ deletingMovie === movie.imdbID ? 'Deleting...' : 'Delete' }}
            </button>
          </MovieCard>
        </MovieList>
        <p v-else class="text-center text-gray-600 italic">No saved movies yet.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { MovieService } from '@/api/movie.service';
import type { Movie } from '@/interfaces/movie';
import MovieSearch from '@/components/organisms/MovieSearch.vue';
import MovieList from '@/components/molecules/MovieList.vue';
import MovieCard from '@/components/atoms/MovieCard.vue';
import MovieViewToggle from '@/components/organisms/MovieViewToggle.vue';
import FeedbackMessage from '@/components/atoms/FeedbackMessage.vue';
import Header from '@/layouts/Header.vue';

export default defineComponent({
  name: 'MovieDashboard',
  components: {
    MovieSearch,
    MovieList,
    MovieCard,
    MovieViewToggle,
    FeedbackMessage,
    Header,
  },
  setup() {
    const searchTitle = ref('');
    const searchResults = ref<Movie[]>([]);
    const savedMovies = ref<Movie[]>([]);
    const currentView = ref<'all' | 'mine'>('all');
    const searchAttempted = ref(false);
    const loading = ref(false);
    const deletingMovie = ref<string | null>(null);
    const savingMovie = ref<string | null>(null);
    const showSavedFeedback = ref(false);
    const sortOrder = ref<'asc' | 'desc'>('desc');
    const clientId = (() => {
      const clientJson = localStorage.getItem('client');
      if (clientJson) {
        try {
          const client = JSON.parse(clientJson);
          return client.id ?? null;
        } catch {
          return null;
        }
      }
      return null;
    })();

    const sortedSearchResults = computed(() => {
      return [...searchResults.value].sort((a, b) => {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return sortOrder.value === 'asc' ? yearA - yearB : yearB - yearA;
      });
    });

    function toggleSortOrder() {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    }

    const isValidMovie = (movie: Movie): boolean => {
      return !!movie.Title && !!movie.Year && !!movie.imdbID;
    };

    const searchMovies = async () => {
      if (!searchTitle.value.trim()) {
        console.log('[searchMovies] Search title is empty');
        return;
      }

      try {
        searchAttempted.value = true;
        const response = await MovieService.searchMovies({ title: searchTitle.value });
        // @ts-ignore
        if (response && Array.isArray(response.Search)) {
          // @ts-ignore
          searchResults.value = response.Search;
        } else {
          console.warn('[searchMovies] Unexpected API response structure');
          searchResults.value = [];
        }
      } catch (error) {
        console.error('[searchMovies] Error searching movies:', error);
        searchResults.value = [];
      }
    };

    const saveMovie = async (movie: Movie) => {
      if (!isValidMovie(movie)) {
        alert('Invalid movie data. Cannot save.');
        return;
      }

      try {
        savingMovie.value = movie.imdbID;

        const isAlreadySaved = savedMovies.value.some(
          (m) => m.imdbID === movie.imdbID && m.clientId === clientId
        );

        if (isAlreadySaved) {
          alert('This movie is already in your collection!');
          return;
        }
        // @ts-ignore
        const movieToSave: Movie = {
          Title: movie.Title,
          Year: movie.Year,
          imdbID: movie.imdbID,
          Poster: movie.Poster,
          Type: movie.Type || 'movie',
          clientId: clientId,
        };

        await MovieService.saveMovie(movieToSave);
        await fetchSavedMovies();

        showSavedFeedback.value = true;
        setTimeout(() => (showSavedFeedback.value = false), 3000);
        searchResults.value = searchResults.value.filter((m) => m.imdbID !== movie.imdbID);
      } catch (error) {
        console.error('[saveMovie] Error saving movie:', error);
        alert('Failed to save the movie. Please try again.');
      } finally {
        savingMovie.value = null;
      }
    };

    const deleteMovie = async (imdbID: string) => {
      try {
        deletingMovie.value = imdbID;
        await MovieService.deleteMovie(imdbID);
        await fetchSavedMovies();
      } catch (error) {
        console.error('[deleteMovie] Error deleting movie:', error);
        alert('Failed to delete the movie. Please try again.');
      } finally {
        deletingMovie.value = null;
      }
    };

    const fetchSavedMovies = async () => {
      try {
        loading.value = true;
        console.log('[fetchSavedMovies] Fetching saved movies for client:', clientId);
        const response = await MovieService.listSavedMovies(clientId);

        if (response && Array.isArray(response)) {
          // @ts-ignore
          savedMovies.value = response
            .map((movie: any) => ({
              Title: movie.Title,
              Year: movie.Year,
              imdbID: movie.imdbID,
              Poster: movie.Poster,
              Type: movie.Type,
              clientId: movie.clientId,
            }))
            .filter((movie) => currentView.value === 'all' || movie.clientId === clientId);
        } else {
          console.warn('Unexpected API response structure');
          savedMovies.value = [];
        }
      } catch (error) {
        console.error('Error fetching saved movies:', error);
        savedMovies.value = [];
        alert('Failed to load saved movies. Please try again.');
      } finally {
        loading.value = false;
      }
    };

    const handleViewChange = (view: 'all' | 'mine') => {
      currentView.value = view;
      fetchSavedMovies();
    };

    fetchSavedMovies();

    return {
      searchTitle,
      searchResults,
      sortedSearchResults,
      savedMovies,
      currentView,
      searchAttempted,
      loading,
      deletingMovie,
      savingMovie,
      showSavedFeedback,
      sortOrder,
      toggleSortOrder,
      searchMovies,
      saveMovie,
      deleteMovie,
      handleViewChange,
    };
  },
});
</script>
