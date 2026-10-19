import urllib.request
import json

def test(url, method='GET', data=None):
    req = urllib.request.Request(url, method=method)
    body = None
    if data:
        req.add_header('Content-Type', 'application/json')
        body = json.dumps(data).encode('utf-8')
    try:
        with urllib.request.urlopen(req, data=body, timeout=10) as res:
            content_type = res.headers.get('Content-Type', '')
            status = res.status
            print(f"[{method}] {url} -> HTTP {status}")
            if 'json' in content_type:
                payload = json.loads(res.read().decode('utf-8'))
                if 'gaps' in payload:
                    print(f"   => Returned {len(payload['gaps'])} market gaps")
                    for i, g in enumerate(payload['gaps']):
                        print(f"      {i+1}. {g['name']} (Demand Score: {g.get('demandScore') or g.get('demand_score')})")
                elif 'demand_score' in payload:
                    print(f"   => Validation Score: {payload['demand_score']}/100, Status: {payload['status']}")
                    print(f"   => Competitor Density: {payload['competitor_density']}, Population Fit: {payload['population_fit']}")
                    print(f"   => Verdict: {payload['verdict']}")
                else:
                    print(f"   => Response: {payload}")
            else:
                raw = res.read().decode('utf-8')
                print(f"   => Rendered Page HTML: {len(raw)} characters")
    except Exception as e:
        print(f"[{method}] {url} -> FAILED: {e}")

if __name__ == '__main__':
    print("=== STARTUPRIVAL END-TO-END VERIFICATION ===")
    print("\n1. Testing Frontend App Router Pages:")
    test("http://localhost:3000/")
    test("http://localhost:3000/auth/login")
    test("http://localhost:3000/auth/signup")
    test("http://localhost:3000/gap-finder")
    test("http://localhost:3000/dashboard")

    print("\n2. Testing FastAPI Backend Endpoints:")
    test("http://127.0.0.1:8000/health")
    test("http://127.0.0.1:8000/api/find-gap", method="POST", data={
        "sector": "Agriculture",
        "region": "Maharashtra"
    })
    test("http://127.0.0.1:8000/api/validate-idea", method="POST", data={
        "gap_name": "Micro-Cold Storage & Farmgate Pre-Cooling Hubs",
        "sector": "Agriculture",
        "region": "Maharashtra"
    })
