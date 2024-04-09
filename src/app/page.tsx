

export default async function Index() {
  return (
      <div id='index'>
      <div className='index-wrapper'>
        <h1>赵的拇指</h1>
        <div className='my-label'>代码/摄影/跑步/电影/篮球/设计/散打/一切有趣的/...</div>
        <div className='my-link'>
          <a href='https://github.com/zhaofinger' title='github' target='_blank'>GitHub</a>
          <a href='https://t.me/zhaofinger' title='telegrame' target='_blank'>Telegrame</a>
          <a href='https://www.instagram.com/zhao_finger' title='instagram' target='_blank'>Instagram</a>
          <a href='https://twitter.com/zhaofinger' title='twitter' target='_blank'>Twitter</a>
          <a href='https://www.zhihu.com/people/zhao-finger/activities' title='zhihu' target='_blank'>知乎</a>
          <a href='http://weibo.com/puopuo' title='weibo' target='_blank'>微博</a>
        </div>
        <div className='enter-article'>
          <a href='/article' title='article'>进入文章</a>
        </div>
      </div>
    </div>
  );
}
