import { TextDecoder, TextEncoder } from 'util';
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

import '@testing-library/jest-dom';
