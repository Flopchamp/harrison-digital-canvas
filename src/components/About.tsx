import { useMemo } from "react";
import { Code2, Database, Globe, Server, Box } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useProfile } from "@/hooks/useProfile";
import { educationQuery, skillsQuery } from "@/queries/homeQueries";

type LucideIcon = typeof Code2;

type CategoryConfig = {
  icon: LucideIcon;
  gradient: string;
  dotColor: string;
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  Frontend: {
    icon: Globe,
    gradient: "from-violet-600 to-blue-500",
    dotColor: "bg-violet-400",
  },
  Backend: {
    icon: Server,
    gradient: "from-sky-500 to-cyan-400",
    dotColor: "bg-sky-400",
  },
  Database: {
    icon: Database,
    gradient: "from-emerald-500 to-teal-400",
    dotColor: "bg-emerald-400",
  },
  "Tools & DevOps": {
    icon: Box,
    gradient: "from-orange-500 to-amber-400",
    dotColor: "bg-orange-400",
  },
};

const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "Tools & DevOps"];

const About = () => {
  const { data: profile } = useProfile();
  const { data: education, isLoading: educationLoading } = useQuery(educationQuery);
  const { data: skills } = useQuery(skillsQuery);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present";
    return format(new Date(dateStr), "yyyy");
  };

  const groupedSkills = useMemo(() => {
    if (!skills) return {} as Record<string, typeof skills>;
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);
  }, [skills]);

  const orderedCategories = CATEGORY_ORDER.filter((cat) => groupedSkills[cat]?.length);
  const totalSkills = skills?.length ?? 0;

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Bio + Education */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            {profile?.avatar_url && (
              <div className="flex justify-center md:justify-start mb-6">
                <Avatar className="w-48 h-48 border-4 border-primary/20 shadow-xl">
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.full_name || "Profile"}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl font-bold">
                    {profile.full_name?.split(" ").map((n) => n[0]).join("") || "HA"}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            {profile?.bio ? (
              <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                {profile.bio}
              </p>
            ) : (
              <>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a passionate Software Engineer and Full Stack Developer based in Kenya,
                  with a deep love for creating innovative digital solutions that make a real impact.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With expertise spanning frontend and backend technologies, I specialize in building
                  scalable web applications using modern frameworks and cloud technologies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My approach combines technical excellence with user-centric design, ensuring that
                  every project I work on is both powerful and accessible.
                </p>
              </>
            )}
          </div>

          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            {educationLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded mb-1" />
                <div className="h-4 bg-muted rounded" />
              </div>
            ) : education && education.length > 0 ? (
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className={index > 0 ? "pt-4 border-t border-border" : ""}>
                    <h4 className="font-semibold text-lg">{edu.degree}</h4>
                    {edu.field_of_study && (
                      <p className="text-sm text-muted-foreground">{edu.field_of_study}</p>
                    )}
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(edu.start_date)} – {formatDate(edu.end_date)}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h4 className="font-semibold text-lg">Bachelor of Science in Software Engineering</h4>
                <p className="text-muted-foreground">University of Eastern Africa, Baraton</p>
                <p className="text-sm text-muted-foreground">2021 – 2025</p>
              </div>
            )}
          </Card>
        </div>

        {/* ── Skills ───────────────────────────────────────────────── */}
        <div>
          {/* Sub-header */}
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold mb-2">Technical Skills</h3>
            {totalSkills > 0 && (
              <p className="text-sm text-muted-foreground">
                {totalSkills} technologies across {orderedCategories.length} domains
              </p>
            )}
          </div>

          {orderedCategories.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {orderedCategories.map((category) => {
                const config = CATEGORY_CONFIG[category] ?? {
                  icon: Code2,
                  gradient: "from-primary to-accent",
                  dotColor: "bg-primary",
                };
                const { icon: Icon } = config;
                const categorySkills = groupedSkills[category] ?? [];

                return (
                  <Card
                    key={category}
                    className="glass-card overflow-hidden group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Coloured identity strip */}
                    <div className={`h-1 bg-gradient-to-r ${config.gradient}`} />

                    <div className="p-6">
                      {/* Card header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-base">{category}</h4>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full tabular-nums">
                          {categorySkills.length}
                        </span>
                      </div>

                      {/* Skill chips */}
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-background/60 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 cursor-default select-none"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dotColor}`} />
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Loading skeleton — matches the real layout exactly */
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="glass-card overflow-hidden">
                  <div className="h-1 bg-muted" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-muted animate-pulse" />
                        <div className="h-5 w-28 bg-muted rounded animate-pulse" />
                      </div>
                      <div className="h-5 w-6 bg-muted rounded-full animate-pulse" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: i % 2 === 0 ? 4 : 6 }).map((_, j) => (
                        <div
                          key={j}
                          className="h-8 bg-muted rounded-full animate-pulse"
                          style={{ width: `${60 + (j * 13) % 40}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default About;
