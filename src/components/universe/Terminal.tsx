import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, TerminalSquare } from "lucide-react";
import { profile, projects, education, achievements, timeline } from "@/data/universe";

type Line = {
  kind: "in" | "out" | "ascii";
  text: string;
};

type FileNode = {
  name: string;
  type: "dir" | "file";
  content?: string;
  children?: FileNode[];
};
const FILESYSTEM: FileNode = {
  name: "~",
  type: "dir",
  children: [
    {
      name: "projects",
      type: "dir",
      children: [
        {
          name: "GymOS",
          type: "file",
          content:
`Gym OS

AI-powered Gym Management Platform

Frontend:
React + TypeScript

Backend:
FastAPI

Database:
PostgreSQL

Authentication:
Firebase

Deployment:
Vercel`,
        },
        {
          name: "FitMind AI",
          type: "file",
          content:
`FitMind AI

AI Fitness SaaS

Uses LangChain,
FastAPI,
React,
Firebase,
Groq`,
        },
        {
          name: "SSC AI",
          type: "file",
          content:
`AI-powered SSC preparation platform

RAG
FastAPI
React
PostgreSQL`,
        },
      ],
    },

    {
      name: "resume",
      type: "file",
      content: "Use 'open resume' to download.",
    },

    {
      name: "skills",
      type: "file",
      content:
"React\nFastAPI\nLangChain\nPython\nTypeScript\nPostgreSQL\nDocker",
    },

    {
      name: "education",
      type: "file",
      content:
`${education.university}

${education.degree}

CGPA ${education.cgpa}`,
    },

    {
      name: "contact",
      type: "file",
      content:
`${profile.links.email}

${profile.links.phone}`,
    },
  ],
};
function findNode(
  node: FileNode,
  path: string[]
): FileNode | null {

  if (path.length === 0)
    return node;

  if (!node.children)
    return null;

  const next = node.children.find(
    c => c.name === path[0]
  );

  if (!next)
    return null;

  return findNode(
    next,
    path.slice(1)
  );
}

const HELP = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        MANORANJAN OS TERMINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Welcome!
You don't need to know programming.
Just type any command below.
──────────────────────────────────────────────
ABOUT ME
about
whoami
profile
Learn who Manoranjan is.
──────────────────────────────────────────────
PROJECTS
projects
project
show projects
See all major projects.
cat GymOS
cat "FitMind AI"
cat "SSC AI"
Read project details.
──────────────────────────────────────────────
CAREER
resume
open resume
Download resume.
education
View education.
skills
View technical skills.
experience
Current journey.
achievements
Awards & certifications.
──────────────────────────────────────────────
CONTACT
contact
Email & phone.
github
Open GitHub.
linkedin
Open LinkedIn.
leetcode
Open LeetCode.
hire
Why you should hire Manoranjan.
──────────────────────────────────────────────
TERMINAL
ls
List files.
cd projects
Open projects folder.
pwd
Current location.
find AI
Search files.
clear
Clear screen.
exit
Close terminal.
──────────────────────────────────────────────
FUN
coffee
☕
future
Future roadmap.
fortune
Random quote.
matrix
Enter Matrix Mode.
ascii
ASCII logo.
neofetch
System information.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

const ASCII = `
   __  ___                        _              
  /  |/  /___ _____  ____  _____ (_)___ _____    
 / /|_/ / __ \`/ __ \\/ __ \\/ ___// / __ \`/ __ \\  
/ /  / / /_/ / / / / /_/ / /   / / /_/ / / / /   
_/  /_/\\__,_/_/ /_/\\____/_/   /_/\\__,_/_/ /_/    
`;

const NEOFETCH = () => `manoranjan@os ~ % neofetch
──────────────────────────────
 OS      Manoranjan OS v2.0
 Host    Chandigarh University
 Kernel  Human 21.y · CSE
 Uptime  since 2004
 Shell   /bin/curiosity
 CPU     Neural · full stack
 Memory  ${Math.floor(60+Math.random()*30)}% dreams / 100%
 GPU     Imagination RTX
 Stack   React · FastAPI · LangChain · AI
 Status  ${profile.availability}
──────────────────────────────`;

const FORTUNES = [
  "Ship small. Ship often. Iterate.",
  "The best UI is invisible.",
  "AI is a tool. Taste is the moat.",
  "Read the source. All of it.",
  "Coffee first. Then compile.",
  "Design for the one, scale for the many.",
];

function ls(path: string[]) {
  const node = findNode(FILESYSTEM, path);

  if (!node)
    return "Directory not found.";

  if (node.type !== "dir")
    return node.name;

  return node.children
    ?.map((c) =>
      c.type === "dir"
        ? `${c.name}/`
        : c.name
    )
    .join("\n") ?? "";
}
function cat(path: string[]) {
  const node = findNode(FILESYSTEM, path);

  if (!node)
    return "File not found.";

  if (node.type === "dir")
    return "Cannot cat a directory.";

  return node.content ?? "";
}
function pwd(path: string[]) {
  return path.length
    ? "~/" + path.join("/")
    : "~";
}
function findFiles(
  node: FileNode,
  query: string,
  prefix = "~"
): string[] {

  let out: string[] = [];

  if (
    node.name
      .toLowerCase()
      .includes(query.toLowerCase())
  ) {
    out.push(prefix);
  }

  node.children?.forEach((c) => {
    out.push(
      ...findFiles(
        c,
        query,
        prefix + "/" + c.name
      )
    );
  });

  return out;
}

export function Terminal() {
  const [cwd, setCwd] = useState<string[]>([]);
  const runCommand = (
  command: string,
  push: (l: Line) => void
) => {

 const raw = command.trim();

const lower = raw.toLowerCase();

const args = raw.split(" ");

const cmd = args[0].toLowerCase();
if (
  lower === "about" ||
  lower === "profile" ||
  lower === "whoami" ||
  lower === "who is manoranjan" ||
  lower === "tell me about yourself"
){
  push({
    kind: "out",
    text:
`${profile.name}

${profile.role}

${profile.location}

${profile.bio}`
  });

  return;
}
if (lower === "education") {

  push({
    kind:"out",
    text:
`${education.university}

${education.degree}

CGPA ${education.cgpa}`
  });

  return;
}
if (lower === "skills") {

  push({
    kind:"out",
    text:
`Frontend
React
TypeScript

Backend
FastAPI
Python

AI
LangChain
LLMs
RAG

Database
PostgreSQL
Firebase`
  });

  return;
}

if (
  lower === "projects" ||
  lower === "project" ||
  lower === "show projects"
) {
  push({
    kind: "out",
    text:
projects
  .map(
    p =>
`• ${p.name}

${p.tagline}
`
  )
  .join("\n")
  });

  return;
}

if (
  lower === "resume" ||
  lower === "download resume"
) {

  window.open(profile.links.resume,"_blank");

  push({
    kind:"out",
    text:"Opening Resume..."
  });

  return;
}

if (lower === "github") {

  window.open(profile.links.github, "_blank");

  push({
    kind: "out",
    text: "Opening GitHub...",
  });

  return;
}

if (lower === "linkedin") {

  window.open(profile.links.linkedin, "_blank");

  push({
    kind: "out",
    text: "Opening LinkedIn...",
  });

  return;
}

if (lower === "leetcode") {

  window.open(
    "https://leetcode.com/u/manoranjan507/",
    "_blank"
  );

  push({
    kind: "out",
    text: "Opening LeetCode...",
  });

  return;
}

if (
  lower === "contact"
) {

  push({

    kind:"out",

    text:
`Email

${profile.links.email}

Phone

${profile.links.phone}

LinkedIn

${profile.links.linkedin}`

  });

  return;
}

if (
  lower === "experience"
) {

  push({

    kind:"out",

    text:
`Current Focus
• Building AI Products
• Full Stack Development
• RAG Systems
• LangChain
• FastAPI
• React
Graduating in 2026.`
  }); 

  return;
}

if (
  lower === "hire"
) {

  push({

    kind:"out",

    text:
`Why Hire Manoranjan?
✓ AI Engineer
✓ Full Stack Developer
✓ Builds production-ready applications
✓ Strong problem solving
✓ Passionate about modern AI
✓ Always learning
Let's build something amazing together.`
  });

  return;
}
  switch (cmd) {

    case "help":
      push({
        kind:"out",
        text:HELP,
      });
      return;

    case "ls":
      push({
        kind:"out",
        text:ls(cwd),
      });
      return;

    case "pwd":
      push({
        kind:"out",
        text:pwd(cwd),
      });
      return;
case "exit":
  setOpen(false);
  return;
    case "cat": {

      if (!args[1]) {
        push({
          kind:"out",
          text:"Usage: cat <file>",
        });
        return;
      }

      push({
        kind:"out",
        text:cat([...cwd,args.slice(1).join(" ")]),
      });

      return;
    }

    case "cd": {

      if (!args[1]) {

        setCwd([]);

        return;
      }

      if (args[1] === "..") {

        setCwd((p)=>p.slice(0,-1));

        return;
      }

      const next=[
        ...cwd,
        args[1],
      ];

      const node=findNode(
        FILESYSTEM,
        next
      );

      if(
        node &&
        node.type==="dir"
      ){

        setCwd(next);

      }

      else{

        push({
          kind:"out",
          text:"Directory not found.",
        });

      }

      return;

    }

    case "find":{

      if(!args[1]){

        push({
          kind:"out",
          text:"Usage: find <text>",
        });

        return;

      }

      push({

        kind:"out",

        text:findFiles(
          FILESYSTEM,
          args[1]
        ).join("\n"),

      });

      return;

    }

    case "history":{

      push({

        kind:"out",

        text:history.join("\n"),

      });

      return;

    }

    case "open":{

      if(!args[1]){

        push({
          kind:"out",
          text:"Usage: open <target>",
        });

        return;

      }

      switch(args[1]){

case "github":

  window.open(
    profile.links.github,
    "_blank"
  );

  push({
    kind: "out",
    text: "Opening GitHub..."
  });

  return;

        case "resume":

          window.open(
            profile.links.resume,
            "_blank"
          );

          break;

        case "linkedin":

          window.open(
            profile.links.linkedin,
            "_blank"
          );

          break;

        default:

          push({

            kind:"out",

            text:"Unknown target.",

          });

      }

      return;

    }
case "coffee": {
  window.dispatchEvent(new CustomEvent("ee:coffee"));

  push({
    kind: "out",
    text: "☕ Brewing coffee... please wait...",
  });

  return;
}

case "future": {
  window.dispatchEvent(new CustomEvent("ee:future"));

  push({
    kind: "out",
    text:
`Roadmap Loaded

2026 → Graduate
2027 → AI Engineer
2028 → Build Products
2030 → Startup
2035 → Build something that changes millions of lives.`,
  });

  return;
}

case "matrix": {
  window.dispatchEvent(new CustomEvent("ee:matrix"));

  push({
    kind: "out",
    text:
"There is no spoon...\nEntering Matrix Mode...",
  });

  return;
}

case "fortune": {

  push({
    kind: "out",
    text:
FORTUNES[
Math.floor(Math.random()*FORTUNES.length)
    ],
  });

  return;
}

case "ascii": {

  push({
    kind: "ascii",
    text: ASCII,
  });

  return;
}

case "neofetch": {

  push({
    kind: "ascii",
    text: NEOFETCH(),
  });

  return;
}

case "achievements": {

  push({
    kind: "out",
    text:
achievements
.map(a=>`★ ${a.title}\n${a.detail}`)
.join("\n\n"),
  });

  return;
}
case "sudo": {

  if(args[1] === "hire-me"){

    push({
      kind:"out",
      text:
`[sudo] password for recruiter: ********

Access Granted ✅

Why Hire Manoranjan?

✓ AI Engineer
✓ Full Stack Developer
✓ Strong Problem Solver
✓ Fast Learner
✓ Passionate Builder

Email:
${profile.links.email}`,
    });

    return;
  }

  push({
    kind:"out",
    text:"Unknown sudo command.",
  });

  return;
}
    case "clear":{

      setLines([]);

      return;

    }

    default:

      push({

        kind:"out",

        text:`Unknown command "${cmd}"`,

      });

  }

};
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { kind: "ascii", text: ASCII },
    { kind: "out", text: "Welcome to Manoranjan OS · type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inField = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA");
      if (e.key === "`" && !inField) { e.preventDefault(); setOpen(o => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    const openEv = () => setOpen(true);
    const closeEv = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", openEv);
    window.addEventListener("terminal:close", closeEv);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("terminal:open", openEv);
      window.removeEventListener("terminal:close", closeEv);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    setLines(ls => [...ls, { kind: "in", text: cmd }]);
    setHistory(h => [...h, cmd]);
    setHi(-1);
    setInput("");
    runCommand(cmd, (l) => {
  setLines((ls) => [...ls, l]);
});
  };

  const prompt = useMemo(() => {

  return cwd.length
    ? `manoranjan@os:~/${cwd.join("/")}$`
    : "manoranjan@os:~$";

}, [cwd]);

  return (
    <>
<motion.button
  onClick={() => setOpen(true)}
  aria-label="Open Terminal"
  whileHover={{
    scale: 1.04,
  }}
  whileTap={{
    scale: 0.98,
  }}
className="fixed bottom-6 left-6 z-[90] scale-90 origin-bottom-left"
>
  {/* Glow */}
  <motion.div
    animate={{
      opacity: [0.35, 0.7, 0.35],
    }}
    transition={{
      repeat: Infinity,
      duration: 2,
    }}
    className="absolute inset-0 rounded-full bg-orange-500/10 blur-lg"
  />
<motion.div
  animate={{
    opacity: [0.2, 0.8, 0.2],
  }}
  transition={{
    repeat: Infinity,
    duration: 3,
  }}
  className="absolute inset-0 rounded-full border border-orange-500/30"
/>
  {/* Outer Border */}
  <div className="relative flex items-center gap-2 rounded-full border border-orange-500/30 bg-black/70 px-3 py-2 backdrop-blur-xl">

  {/* Animated Icon */}
  <motion.div
    animate={{
      boxShadow: [
        "0 0 5px rgba(249,115,22,.25)",
        "0 0 10px rgba(249,115,22,.6)",
        "0 0 5px rgba(249,115,22,.25)",
      ],
    }}
    transition={{
      repeat: Infinity,
      duration: 2,
    }}
    className="grid h-8 w-8 place-items-center rounded-lg border border-orange-500/40 bg-orange-500/10"
  >
    <motion.div
      animate={{
        rotate: [0, -5, 5, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
      }}
    >
      <TerminalSquare className="h-4 w-4 text-orange-400" />
    </motion.div>
  </motion.div>

  {/* Text */}
  <div className="leading-tight">
    <div className="text-sm font-medium text-white">
      Terminal
    </div>

    <div className="text-[8px] uppercase tracking-[0.3em] text-orange-300/70">
      Manoranjan OS
    </div>
  </div>

  {/* Shortcut */}
  <motion.div
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      repeat: Infinity,
      duration: 2,
    }}
    className="ml-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60"
  >
    `
  </motion.div>

</div>

</motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] grid place-items-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 font-mono text-[13px]"
            >
              <div className="flex items-center justify-between border-b border-white/5 bg-black/40 px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-white/50">— manoranjan-os · zsh —</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div ref={ref} className="h-[60vh] overflow-y-auto bg-black/70 p-4 text-white/85">
                {lines.map((l, i) => (
                  <div key={i} className="whitespace-pre-wrap">
                    {l.kind === "in" && <><span className="text-orange-300">{prompt}</span> <span>{l.text}</span></>}
                    {l.kind === "out" && <span className="text-white/80">{l.text}</span>}
                    {l.kind === "ascii" && <pre className="text-orange-300/90">{l.text}</pre>}
                  </div>
                ))}
                <form onSubmit={submit} className="mt-1 flex items-center gap-2">
                  <span className="text-orange-300">{prompt}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        const ni = hi < 0 ? history.length - 1 : Math.max(0, hi - 1);
                        setHi(ni); setInput(history[ni] ?? "");
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        const ni = Math.min(history.length, hi + 1);
                        setHi(ni); setInput(history[ni] ?? "");
                      }
                    }}
                    className="flex-1 bg-transparent text-white outline-none caret-orange-300"
                    autoComplete="off" spellCheck={false}
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
