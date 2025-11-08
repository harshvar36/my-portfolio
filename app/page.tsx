'use client';
import Image from "next/image";
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Star, GitFork, Rocket } from 'lucide-react';


// ==== CONFIGURABLE INFO ======================================================
const NAME = 'Harshvardhan Singh';
const TAGLINE = 'Engineer. Analyst. Integrator  • Bridging Tech and Operations  • Solving. Analyzing. Building';
const GITHUB_USERNAME = 'harshvar36';
const LINKEDIN_URL = 'https://www.linkedin.com/in/harshvardhan-singh-508a18319/'; 
const EMAIL = 'harshva36@gmail.com'; // e.g., 'you@example.com'
const RESUME_URL = 'https://drive.google.com/file/d/1LnTMMF7oAcGmyoKzEqvUbTy4Qs9jgUn6/view?usp=drive_link '; 

// Featured repo names to pin to the top grid (must match GitHub repo names exactly)
const FEATURED: string[] = [
  'streamlit-iris-app-aiml',
  // 'disaster-tweets-early-warning',
  // 'humm-voice-journaling',
];

// ==== SMALL UI HELPERS =======================================================
function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition hover:-translate-y-1 hover:shadow-xl">
      {children}
    </div>
  );
}

// ==== MAIN PAGE ==============================================================
export default function Page() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
          // Prevent Next.js caching this request between navigations
          cache: 'no-store',
          headers: { 'Accept': 'application/vnd.github+json' },
        });
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setRepos(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to fetch repos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const { featuredRepos, topRepos } = useMemo(() => {
    const byName: Record<string, any> = Object.fromEntries(repos.map((r) => [r.name, r]));
    const featured = FEATURED.map((name) => byName[name]).filter(Boolean);
    const remaining = repos
      .filter((r) => !FEATURED.includes(r.name))
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 9);
    return { featuredRepos: featured, topRepos: remaining };
  }, [repos]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#0c1222] to-[#0b0f19] text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="text-lg font-bold tracking-tight">
            {NAME}
          </a>
          <div className="hidden gap-6 text-sm md:flex">
            <a href="#projects" className="opacity-80 hover:opacity-100">
              Projects
            </a>
            <a href="#about" className="opacity-80 hover:opacity-100">
              About
            </a>
            <a href="#contact" className="opacity-80 hover:opacity-100">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="opacity-80 hover:opacity-100"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            {LINKEDIN_URL && (
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {EMAIL && (
              <a href={`mailto:${EMAIL}`} className="opacity-80 hover:opacity-100" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <Section id="home">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold leading-tight md:text-6xl"
            >
              Harshvardhan Singh
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.h1>
            <p className="mt-4 max-w-xl text-white/80">{TAGLINE}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-medium text-black hover:opacity-90"
              >
                <Github className="h-4 w-4" /> View GitHub
              </a>
              <a
                href={RESUME_URL}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 font-medium hover:bg-white/10"
              >
                <Rocket className="h-4 w-4" /> Resume
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto h-80 w-56 md:h-[420px] md:w-[300px] overflow-hidden rounded-2xl border-2 border-fuchsia-500/40 shadow-xl"
          >
            {/* gentle up-down float */}
            <motion.div
              animate={{ y: [0, -6, 0, 6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image src="/harshvardhan.JPG" alt="Harshvardhan" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
          </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Featured Projects">
        {loading && <p className="text-white/70">Loading projects…</p>}
        {error && <p className="text-rose-400">{error}</p>}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredRepos.length === 0 && (
              <Card>
                <div>
                  <h3 className="text-lg font-semibold">My featured projects</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Update the <code>FEATURED</code> array in the page code with your best repo names to pin them here.
                  </p>
                </div>
              </Card>
            )}
            {featuredRepos.map((r) => (
              <RepoCard key={r.id} repo={r} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Top Repositories">
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topRepos.map((r) => (
              <RepoCard key={r.id} repo={r} />
            ))}
          </div>
        )}
        {!loading && !error && topRepos.length === 0 && (
          <p className="text-white/70">No repositories found. Make sure your GitHub username is correct.</p>
        )}
      </Section>

      {/* ABOUT */}
      <Section id="about" title="About">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-white/80">
              I am an engineer driven by a fundamental curiosity for how systems work—from cutting-edge wireless networks to complex operational workflows.

              My experience is uniquely broad, spanning from theoretical research in Reconfigurable Intelligent Surfaces (RIS) to practical data analysis for maritime crew management.

              I thrive at the intersection of innovation, data, and operations. Whether it's optimizing a system, analyzing a dataset, or exploring a new technology, I am a persistent problem-solver who builds bridges between an idea and its real-world execution.
            </p>
            <p className="mt-4 text-white/80">
              Interests: Innovation, AI/ML, Data Analysis, DevOps, Cloud Computing, Wireless Communications, Systems Design, Operational Efficiency.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="mb-3 font-semibold">Highlights</h3>
            <ul className="list-disc space-y-2 pl-5 text-white/80">
              <li>Data-Driven Operational Analysis</li>
              <li>DevOps basics: GitHub Actions, Docker (learning)</li>
              <li>Versatile Cross-Domain Experience</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10"
          >
            <Github className="h-4 w-4" /> github.com/{GITHUB_USERNAME}
          </a>
          {LINKEDIN_URL && (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          )}
          {EMAIL && (
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10"> 
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          )}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {NAME}. 
      </footer>
    </div>
  );
}

function RepoCard({ repo }: { repo: any }) {
  const updated = new Date(repo.updated_at).toLocaleDateString();
  return (
    <Card>
      <div>
        <div className="flex items-start justify-between gap-3">
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">
            {repo.name}
          </a>
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100" aria-label="Open on GitHub">
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-white/70">{repo.description || 'No description provided.'}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/70">
        <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" /> {repo.stargazers_count}</span>
        <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" /> {repo.forks_count}</span>
        {repo.language && <Pill>{repo.language}</Pill>}
        <span className="ml-auto">Updated {updated}</span>
      </div>
    </Card>
  );
}
