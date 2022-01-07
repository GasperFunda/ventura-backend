import sys
import subprocess

procs = []
for i in range(3):
    proc = subprocess.Popen([sys.executable, 'monitorDB.py'])
    procs.append(proc)

for proc in procs:
    proc.wait()