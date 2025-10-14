import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { format } from "date-fns";

const Experience = () => {
  const { data: experiences, isLoading: loadingExp } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("display_order", { ascending: true })
        .order("start_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: education, isLoading: loadingEdu } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("display_order", { ascending: true })
        .order("start_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const formatDate = (dateStr: string | null, isCurrent: boolean = false) => {
    if (isCurrent) return "Present";
    if (!dateStr) return "Present";
    return format(new Date(dateStr), "MMM yyyy");
  };

  if (loadingExp || loadingEdu) {
    return (
      <section id="experience" className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experience & <span className="gradient-text">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-40 animate-pulse bg-muted/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Professional Experience</h3>
            </div>
            
            <div className="space-y-6 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-border">
              {experiences && experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <Card
                    key={exp.id}
                    className="glass-card p-6 ml-14 hover:shadow-lg transition-shadow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -left-[3.5rem] top-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-1">{exp.position}</h4>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(exp.start_date)} - {formatDate(exp.end_date, exp.is_current)}
                      </span>
                      {exp.location && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                    
                    {exp.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </Card>
                ))
              ) : (
                <Card className="glass-card p-6 ml-14">
                  <p className="text-muted-foreground">No experience entries yet.</p>
                </Card>
              )}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            
            <div className="space-y-6 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-border">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <Card
                    key={edu.id}
                    className="glass-card p-6 ml-14 hover:shadow-lg transition-shadow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -left-[3.5rem] top-6 w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-1">{edu.degree}</h4>
                    <p className="text-accent font-medium mb-2">{edu.institution}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                      </span>
                    </div>
                    
                    {edu.field_of_study && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Field: {edu.field_of_study}
                      </p>
                    )}
                    
                    {edu.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </Card>
                ))
              ) : (
                <Card className="glass-card p-6 ml-14">
                  <p className="text-muted-foreground">No education entries yet.</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
