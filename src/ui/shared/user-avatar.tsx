import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function initials(name?: string | null, email?: string | null) {
	const source = name?.trim() || email?.split("@")[0] || "";
	const parts = source.split(/[\s._-]+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserAvatar({
	name,
	email,
	image,
	size = 28,
	className,
}: {
	name?: string | null;
	email?: string | null;
	image?: string | null;
	size?: number;
	className?: string;
}) {
	return (
		<Avatar style={{ width: size, height: size }} className={className}>
			{image && <AvatarImage src={image} alt="" />}
			<AvatarFallback
				style={{ fontSize: size * 0.4 }}
				className="border border-border bg-accent text-accent-foreground">
				{initials(name, email)}
			</AvatarFallback>
		</Avatar>
	);
}
