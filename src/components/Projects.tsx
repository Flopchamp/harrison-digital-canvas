import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Projects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section id="projects" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-96 animate-pulse bg-muted/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {project.image_url && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech_stack.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {/* View Details Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="glass-card">
                          <Info className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-2">{project.title}</DialogTitle>
                          <DialogDescription className="text-base">
                            {project.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        {project.image_url && (
                          <div className="relative h-64 rounded-lg overflow-hidden my-4">
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {project.long_description && (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                              {project.long_description}
                            </div>
                          </div>
                        )}

                        {project.tech_stack && project.tech_stack.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech_stack.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 mt-6">
                          {project.github_url && (
                            <Button variant="outline" asChild>
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                View Code
                              </a>
                            </Button>
                          )}
                          {project.demo_url && (
                            <Button className="bg-gradient-to-r from-primary to-accent" asChild>
                              <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {project.github_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card"
                        asChild
                      >
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo_url && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent"
                        asChild
                      >
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Projects will be displayed here once added to the database.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
