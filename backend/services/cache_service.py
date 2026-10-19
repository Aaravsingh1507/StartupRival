import hashlib
import time
from typing import Optional, Dict, Any

# In-memory LRU / TTL cache for instant zero-latency caching
_MEMORY_CACHE: Dict[str, Dict[str, Any]] = {}
CACHE_TTL_SECONDS = 24 * 3600  # 24 hours

def generate_query_hash(sector: str, region: str) -> str:
    normalized = f"{sector.strip().lower()}:{region.strip().lower()}"
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()

def get_cached_result(sector: str, region: str) -> Optional[Dict[str, Any]]:
    query_hash = generate_query_hash(sector, region)
    cached = _MEMORY_CACHE.get(query_hash)
    if not cached:
        return None

    created_at = cached.get("timestamp", 0)
    if time.time() - created_at < CACHE_TTL_SECONDS:
        return cached.get("data")
    else:
        # Expired
        _MEMORY_CACHE.pop(query_hash, None)
        return None

def set_cached_result(sector: str, region: str, data: Dict[str, Any]) -> None:
    query_hash = generate_query_hash(sector, region)
    _MEMORY_CACHE[query_hash] = {
        "timestamp": time.time(),
        "data": data
    }
