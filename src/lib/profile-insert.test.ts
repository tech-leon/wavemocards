import { describe, it, expect } from 'vitest';
import { buildProfileInsert } from '@/lib/profile-insert';

describe('buildProfileInsert', () => {
  const user = { id: 'user_123', email: 'a@b.com', firstName: 'Ada', lastName: 'Lovelace' };

  it('maps WorkOS fields onto the profile row', () => {
    expect(buildProfileInsert(user)).toEqual({
      workos_user_id: 'user_123',
      email: 'a@b.com',
      locale_preference: 'zh-TW',
      first_name: 'Ada',
      last_name: 'Lovelace',
    });
  });

  it('always sets a default locale_preference', () => {
    // Guards the Phase 2 fix: every profile-creation path must seed locale_preference,
    // otherwise records-first users end up without a language preference.
    expect(buildProfileInsert(user).locale_preference).toBe('zh-TW');
  });

  it('passes through null names', () => {
    const row = buildProfileInsert({ ...user, firstName: null, lastName: null });
    expect(row.first_name).toBeNull();
    expect(row.last_name).toBeNull();
  });
});
