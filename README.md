# ❗ 23.08.13 Learned_Next.js

### Good to know

- Pre-rendering
  - Next.js가 사전에 각 페이지(HTML)를 만들어 놓는다.
  - 생성된 각 페이지(HTML)는 최소한으로 필요한 자바스크립트 코드와 결합되어있다.
  - 브라우저에 의해 페이지가 로드되면, 자바스크립트 코드가 실행되어 페이지와 유저가 상호작용할 수 있게 된다. ( hydrate )
  - 더 나은 성능과 SEO를 갖출 수 있다.

### 1. Next.js v.13 의 fetch API를 이용한 SSG, SSR, ISR

</br>

- SSG(Static Site Generation)

```
/* getStaticProps 사용 */

import React from 'react';

export async function getStaticProps() {
  // 빌드 시점
  const data = await fetch('https://api.example.com/data');
  const jsonData = await data.json();

  return {
    props: {
      staticData: jsonData,
    },
  };
}

// 컴포넌트
const IndexPage = ({ staticData }) => {
  return (
    <div>
      <h1>정적 사이트 빌드 시점 생성 페이지</h1>
      <p>{staticData}</p>
    </div>
  );
};

export default IndexPage;
```

</br>

- SSR(Server Side Rendering)

```
/* getServerSideProps 사용 */

import React from 'react';

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.example.com/data`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // 페이지 컴포넌트에 props로 전달됩니다
  }
}
```

</br>

- ISR(Incremental Static Regeneration)

```
/* getStaticProps 사용 */
import React from 'react';

// 빌드 시점에 데이터를 가져오고, revalidate 옵션을 설정
export async function getStaticProps() {
  // 빌드 시점
  const data = await fetch('https://api.example.com/data');
  const jsonData = await data.json();

  return {
    props: {
      staticData: jsonData,
    },
    revalidate: 60, // revalidate 옵션 60초마다 재렌더링
  };
}

// 컴포넌트
const IndexPage = ({ staticData }) => {
  return (
    <div>
      <h1>점진적인 정적 사이트 생성 페이지</h1>
      <p>{staticData}</p>
    </div>
  );
};

export default IndexPage;
```
