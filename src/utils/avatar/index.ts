export function getAvatarSource(name: string = "default"): string {
  return `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
}
