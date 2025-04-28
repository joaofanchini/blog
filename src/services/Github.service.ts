const HOSTNAME = "https://api.github.com/users/joaofanchini";

interface Profile {
  id: number;
  login: string;
  avatarUrl: string;
}

export function getProfile(): Promise<Profile> {
  return fetch(`${HOSTNAME}`)
    .then((response) => response.json())
    .then((data) => {
      return { id: data.id, login: data.login, avatarUrl: data.avatar_url };
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      throw error;
    });
}
