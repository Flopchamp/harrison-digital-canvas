import { Code2, Database, Globe, Smartphone, Server, Box } from "lucide-react";
import { Card } from "@/components/ui/card";
const About = () => {
  const skills = [{
    name: "React",
    icon: Code2,
    color: "text-primary"
  }, {
    name: "Node.js",
    icon: Server,
    color: "text-accent"
  }, {
    name: "Supabase",
    icon: Database,
    color: "text-primary"
  }, {
    name: "Firebase",
    icon: Database,
    color: "text-accent"
  }, {
    name: "MySQL",
    icon: Database,
    color: "text-primary"
  }, {
    name: "Python",
    icon: Code2,
    color: "text-accent"
  }, {
    name: "C#",
    icon: Code2,
    color: "text-primary"
  }, {
    name: "TypeScript",
    icon: Code2,
    color: "text-accent"
  }, {
    name: "Next.js",
    icon: Globe,
    color: "text-primary"
  }, {
    name: "React Native",
    icon: Smartphone,
    color: "text-accent"
  }, {
    name: "Docker",
    icon: Box,
    color: "text-primary"
  }, {
    name: "REST APIs",
    icon: Server,
    color: "text-accent"
  }];
  return <section id="about" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
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
          </div>

          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Bachelor of Science in Software Engineering</h4>
                <p className="text-muted-foreground">University of Eastern Africa, Baraton</p>
                <p className="text-sm text-muted-foreground">2021- 2025</p>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold">Certifications</h4>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li>• AWS Certified Developer</li>
                  <li>• Google Cloud Professional</li>
                  <li>• Full Stack Development</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills grid */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Technical Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => <Card key={skill.name} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group" style={{
            animationDelay: `${index * 50}ms`
          }}>
                <skill.icon className={`w-8 h-8 mx-auto mb-3 ${skill.color} group-hover:scale-110 transition-transform`} />
                <p className="font-medium text-sm">{skill.name}</p>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default About;