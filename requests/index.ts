export const makeEntry = async () => {
  const f = await fetch("/api/entry", {
    method: "POST",
  });
  const body = await f.json();
  return body;
};
