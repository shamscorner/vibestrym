'use client';

import { useFindChannelByUsernameQuery } from "@/graphql/_generated/output";

export default function Home() {
  const { data, loading } = useFindChannelByUsernameQuery({
    variables: { username: 'quartzQuasar' }
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
