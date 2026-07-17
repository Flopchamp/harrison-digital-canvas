import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AuthorIdentityProps {
  name: string;
  title?: string | null;
  avatarUrl?: string | null;
}

/** Avatar + name + title, shared by BlogPost's top-of-article byline and SupportAuthorCard. */
const AuthorIdentity = ({ name, title, avatarUrl }: AuthorIdentityProps) => (
  <div className="flex items-center gap-3">
    <Avatar className="w-12 h-12 border-2 border-primary/20">
      <AvatarImage src={avatarUrl || undefined} alt={name} />
      <AvatarFallback className="text-sm font-bold">
        {name.split(" ").map((part) => part[0]).join("")}
      </AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{name}</p>
      {title && <p className="text-sm text-muted-foreground">{title}</p>}
    </div>
  </div>
);

export default AuthorIdentity;
