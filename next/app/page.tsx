type Time = {
  datetime: string;
};

async function getTime(): Promise<Time> {
  const res = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Chicago",
    { next: { revalidate: 3 } }
  );
  return res.json();
}

export default async function Home() {
  const [time] = await Promise.all([getTime()]);
  return (
    <div>
      <h1>{time.datetime}</h1>
    </div>
  );
}
