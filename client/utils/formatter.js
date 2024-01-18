export function getInitials(name) {
  if (name) {
    const words = name.split(" ");
    let initials = "";
    for (const word of words) {
      initials += word.charAt(0);
    }

    return initials.toUpperCase();
  } else {
    return "";
  }
}
