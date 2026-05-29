import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { data: profile } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (formData: ContactFormData) => {
    try {
      const { error } = await supabase.from("contact_messages").insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject ?? "",
        message: formData.message,
      }]);
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-contact-notification", {
          body: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject ?? "",
            message: formData.message,
            recipientEmail: profile?.email || "alooharrison7@gmail.com",
          },
        });
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };
  return <section id="contact" className="section-padding bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-accent">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href={`mailto:${profile?.email || "alooharrison7@gmail.com"}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {profile?.email || "alooharrison7@gmail.com"}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-accent to-primary">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">{profile?.location || "Kisumu, Kenya"}</p>
                </div>
              </div>
            </Card>

            <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
              <h3 className="font-semibold mb-3">Let's Connect</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Whether you have a
                question or just want to say hi, I'll try my best to get back to
                you!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-card p-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" {...register("name")} className="mt-1.5" />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" {...register("email")} className="mt-1.5" />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" {...register("subject")} className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." {...register("message")} rows={5} className="mt-1.5 resize-none" />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;