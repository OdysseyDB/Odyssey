export async function followGameFetch(formData) {
  return await fetch("/api/game/follow-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    return res.json();
  });
}
export async function unFollowGameFetch(formData) {
  return await fetch("/api/game/un-follow-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    return res.json();
  });
}