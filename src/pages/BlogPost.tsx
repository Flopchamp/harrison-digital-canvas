import { useQuery } from "@tanstack/react-query";
import { useParams, Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, ArrowLeft, Share2, Github, Linkedin, Twitter } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const { data: profile } = useProfile();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM dd, yyyy");
  };

  const estimateReadTime = (content: string | null) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "";

  const handleShare = async (platform?: string) => {
    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    } else {
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Blog post link copied to clipboard",
        });
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };

  if (error || (!isLoading && !post)) {
    return <Navigate to="/404" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <ThemeToggle />
        <Header />
        <article className="section-padding pt-32">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 w-32 bg-muted/20 animate-pulse rounded mb-6" />
            <div className="h-12 bg-muted/20 animate-pulse rounded mb-4" />
            <div className="h-6 w-64 bg-muted/20 animate-pulse rounded mb-8" />
            <div className="h-96 bg-muted/20 animate-pulse rounded mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-muted/20 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </article>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Header />

      <article className="section-padding pt-32 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>

          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8 shadow-2xl">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
            )}

            {/* Author Info */}
            {profile && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || "Author"} />
                  <AvatarFallback className="text-sm font-bold">
                    {profile.full_name?.split(' ').map(n => n[0]).join('') || 'HA'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{profile.full_name || 'Harrison Aloo'}</p>
                  <p className="text-sm text-muted-foreground">{profile.title || 'Software Engineer'}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at!)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{estimateReadTime(post.content)}</span>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare()}
                  title="Copy link"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-line leading-relaxed text-foreground/90">
              {post.content}
            </div>
          </div>

          <Separator className="my-12" />

          {/* Post Footer */}
          <footer className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/blog">
              <Button variant="outline" className="group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                More Articles
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Share this post:</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
