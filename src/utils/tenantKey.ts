/**
 * Generates a tenant-scoped storage key
 * @param tenantId The ID of the current tenant
 * @param key The base key to be tenant-scoped
 * @returns A tenant-scoped key string
 */
export function tenantKey(tenantId: string | null | undefined, key: string): string {
  if (!tenantId) {
    throw new Error('Tenant ID is required for generating storage key');
  }
  return `${tenantId}:${key}`;
}

/**
 * Validates if a given key belongs to the current tenant
 * @param tenantId The ID of the current tenant
 * @param fullKey The full storage key to validate
 * @returns boolean indicating if the key belongs to the current tenant
 */
export function validateTenantKey(tenantId: string | null | undefined, fullKey: string): boolean {
  if (!tenantId) {
    return false;
  }
  return fullKey.startsWith(`${tenantId}:`);
}

/**
 * Extracts the base key from a tenant-scoped key
 * @param tenantId The ID of the current tenant
 * @param fullKey The full tenant-scoped key
 * @returns The base key without tenant prefix
 */
export function extractBaseKey(tenantId: string | null | undefined, fullKey: string): string {
  if (!validateTenantKey(tenantId, fullKey)) {
    throw new Error('Invalid tenant key');
  }
  return fullKey.slice(tenantId!.length + 1);
}

/**
 * Lists all keys belonging to a specific tenant
 * @param tenantId The ID of the tenant
 * @returns Array of base keys (without tenant prefix) belonging to the tenant
 */
export function listTenantKeys(tenantId: string | null | undefined): string[] {
  if (!tenantId) {
    return [];
  }

  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && validateTenantKey(tenantId, key)) {
      keys.push(extractBaseKey(tenantId, key));
    }
  }
  return keys;
}

/**
 * Clears all storage keys belonging to a specific tenant
 * @param tenantId The ID of the tenant
 */
export function clearTenantStorage(tenantId: string | null | undefined): void {
  if (!tenantId) {
    return;
  }

  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && validateTenantKey(tenantId, key)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
}
