#!/usr/bin/env python3
"""Résumé Markdown d'un rapport Trivy JSON (pour $GITHUB_STEP_SUMMARY)."""
import collections
import json
import sys

SEVS = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"]

report = json.load(open(sys.argv[1]))
image = report.get("ArtifactName", "?")
os_ = report.get("Metadata", {}).get("OS") or {}
out = [f"## Scan Trivy — `{image}`", ""]
if os_:
    out.append(f"OS : {os_.get('Family')} {os_.get('Name')}")
    out.append("")
out.append("| Cible | Type | " + " | ".join(SEVS) + " | Corrigeables |")
out.append("|---|---|" + "---:|" * (len(SEVS) + 1))
total = collections.Counter()
top = []
for r in report.get("Results", []):
    vulns = r.get("Vulnerabilities") or []
    if not vulns:
        continue
    c = collections.Counter(v["Severity"] for v in vulns)
    total.update(c)
    fix = sum(1 for v in vulns if v.get("FixedVersion"))
    out.append(f"| `{r['Target'][-60:]}` | {r.get('Type')} | "
               + " | ".join(str(c[s]) for s in SEVS) + f" | {fix} |")
    for v in vulns:
        if v["Severity"] in ("CRITICAL", "HIGH") and v.get("FixedVersion"):
            top.append((v["Severity"], v["PkgName"], v.get("InstalledVersion", ""),
                        v["FixedVersion"], v["VulnerabilityID"], r.get("Type")))
out.append("| **Total** | | " + " | ".join(f"**{total[s]}**" for s in SEVS) + " | |")
out.append("")
if top:
    seen = set()
    rows = []
    for s, pkg, inst, fixv, vid, typ in sorted(top, key=lambda t: (t[0] != "CRITICAL", t[5], t[1])):
        if (pkg, vid) in seen:
            continue
        seen.add((pkg, vid))
        rows.append(f"| {s} | {typ} | `{pkg}` | {inst} | {fixv} | {vid} |")
    out.append(f"<details><summary>{len(rows)} vulnérabilités CRITICAL/HIGH corrigeables</summary>")
    out.append("")
    out.append("| Sévérité | Type | Paquet | Installé | Corrigé en | ID |")
    out.append("|---|---|---|---|---|---|")
    out.extend(rows)
    out.append("")
    out.append("</details>")
print("\n".join(out))
