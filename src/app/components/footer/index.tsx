// const friendsLink = [
//   {
//     link: 'https://blog.kasora.moe/',
//     title: 'kasora\'s blog'
//   },
//   {
//     link: 'http://foreversong.cn/',
//     title: 'ADog\'s Blog'
//   },
//   {
//     link: 'http://xcatliu.com/',
//     title: '流浪小猫'
//   }
// ];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="licenses">
        本站内容遵循&nbsp;&nbsp;
        <a href="https://creativecommons.org/licenses/by/4.0/deed.zh">
          知识共享 署名 - 非商业性 - 相同方式共享 4.0 国际协议
        </a>
      </div>
      {/* <div className='friends-link link-area'>
        <span className='link-title'>友链:</span>
        <ul className='link-list'>
          {
            friendsLink.map(item => <a href={item.link} key={item.link}></a>)
          }
        </ul>
      </div> */}
      <div className="my-link link-area">
        <span className="link-title">联系:</span>
        <ul className="link-list">
          <a
            href="https://github.com/zhaofinger"
            title="github"
            target="_blank"
          >
            GitHub
          </a>
          <a href="https://t.me/zhaofinger" title="telegrame" target="_blank">
            Telegrame
          </a>
          <a
            href="https://www.instagram.com/zhao_finger/"
            title="instagram"
            target="_blank"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com/zhaofinger"
            title="twitter"
            target="_blank"
          >
            Twitter
          </a>
          <a
            href="https://www.zhihu.com/people/zhao-finger/activities"
            title="zhihu"
            target="_blank"
          >
            知乎
          </a>
          <a href="http://weibo.com/puopuo" title="weibo" target="_blank">
            微博
          </a>
        </ul>
      </div>
    </footer>
  );
}
