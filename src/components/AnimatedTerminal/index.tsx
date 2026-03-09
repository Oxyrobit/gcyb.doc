import {useState, useEffect, useRef} from 'react';
import type {ReactNode} from 'react';
import styles from './styles.module.css';

type Scene = {
  prompt: string;
  command: string;
  output: string[];
  highlight?: number[];
};

const SCENES: Scene[] = [
  {
    prompt: 'user@kali:~$',
    command: 'nmap -sV --script vuln 10.10.10.1',
    output: [
      'PORT   STATE SERVICE VERSION',
      '22/tcp open  ssh     OpenSSH 7.4p1',
      '80/tcp open  http    Apache httpd 2.4.6',
      '| http-vuln-cve2017-5638: VULNERABLE',
      '|_  Remote Code Execution via Struts2',
    ],
    highlight: [3, 4],
  },
  {
    prompt: 'user@linux:~$',
    command: 'python3 scanner.py --target 192.168.1.0/24',
    output: [
      '[*] Scanning 254 hosts...',
      '[+] 192.168.1.1   open: 80, 443, 22',
      '[+] 192.168.1.42  open: 22, 3306, 8080',
      '[+] 192.168.1.105 open: 445, 3389',
      '[✓] Scan terminé — 3 hôtes actifs trouvés',
    ],
    highlight: [4],
  },
  {
    prompt: 'user@linux:~$',
    command: 'hashcat -m 1000 hashes.txt rockyou.txt',
    output: [
      'Session.........: hashcat',
      'Hash.Mode........: 1000 (NTLM)',
      'Status...........: Cracked',
      'aad3b435b51404ee → P@ssw0rd2024!',
      'Recovered........: 1/1 (100.00%)',
    ],
    highlight: [3],
  },
  {
    prompt: 'user@linux:~$',
    command: 'openssl req -x509 -newkey rsa:4096 -out cert.pem',
    output: [
      'Generating a RSA private key, 4096 bit',
      '...........++++',
      "writing new private key to 'key.pem'",
      'Country Name (2 letter code) [AU]: FR',
      '[✓] Certificat auto-signé généré avec succès',
    ],
    highlight: [4],
  },
];

const TYPING_SPEED = 42;
const OUTPUT_LINE_DELAY = 200;
const SCENE_PAUSE = 2800;
const CLEAR_DELAY = 500;

export default function AnimatedTerminal(): ReactNode {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [shownLines, setShownLines] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'output' | 'pause' | 'clearing'>('typing');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = SCENES[sceneIdx];

  useEffect(() => {
    setTypedCmd('');
    setShownLines(0);
    setPhase('typing');
  }, [sceneIdx]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (phase === 'typing') {
      if (typedCmd.length < scene.command.length) {
        timeoutRef.current = setTimeout(() => {
          setTypedCmd(scene.command.slice(0, typedCmd.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => setPhase('output'), 350);
      }
    } else if (phase === 'output') {
      if (shownLines < scene.output.length) {
        timeoutRef.current = setTimeout(() => {
          setShownLines((n) => n + 1);
        }, OUTPUT_LINE_DELAY);
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pause'), SCENE_PAUSE);
      }
    } else if (phase === 'pause') {
      timeoutRef.current = setTimeout(() => setPhase('clearing'), 300);
    } else if (phase === 'clearing') {
      timeoutRef.current = setTimeout(() => {
        setSceneIdx((i) => (i + 1) % SCENES.length);
      }, CLEAR_DELAY);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase, typedCmd, shownLines, scene]);

  return (
    <div className={styles.terminal}>
      <div className={styles.titleBar}>
        <span className={styles.dot} data-color="red" />
        <span className={styles.dot} data-color="yellow" />
        <span className={styles.dot} data-color="green" />
        <span className={styles.titleText}>bash — 80×24</span>
      </div>
      <div className={styles.body}>
        <div className={styles.line}>
          <span className={styles.prompt}>{scene.prompt}</span>
          <span className={styles.command}>{typedCmd}</span>
          {phase === 'typing' && <span className={styles.cursor} />}
        </div>
        {phase !== 'typing' &&
          scene.output.slice(0, shownLines).map((line, i) => (
            <div
              key={i}
              className={`${styles.outputLine} ${scene.highlight?.includes(i) ? styles.highlightLine : ''}`}
            >
              {line}
            </div>
          ))}
        {phase === 'pause' && (
          <div className={styles.line}>
            <span className={styles.prompt}>{scene.prompt}</span>
            <span className={styles.cursor} />
          </div>
        )}
      </div>
    </div>
  );
}
