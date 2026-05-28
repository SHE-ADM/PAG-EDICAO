import '@testing-library/jest-dom/vitest';
import { vi, beforeEach } from 'vitest';
import { supabase } from '../lib/supabase';

// Global Supabase mock: keeps tests off the real client (which throws when env
// vars are absent). Each test overrides the relevant method via vi.mocked(...).
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.mocked(supabase.auth.getSession).mockReset().mockResolvedValue({
    data: { session: null },
  } as never);
  vi.mocked(supabase.auth.onAuthStateChange).mockReset().mockReturnValue({
    data: { subscription: { unsubscribe: vi.fn() } },
  } as never);
  vi.mocked(supabase.auth.signInWithPassword).mockReset().mockResolvedValue({
    data: {},
    error: null,
  } as never);
  vi.mocked(supabase.auth.signOut).mockReset().mockResolvedValue({
    error: null,
  } as never);
});
