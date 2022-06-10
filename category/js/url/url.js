// 获取当前url中的参数
const getQueryString = (name) => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(name);
};

var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has('topic') === true; // true
searchParams.get('topic') === 'api'; // true
searchParams.getAll('topic'); // ["api"]
searchParams.get('foo') === null; // true
searchParams.append('topic', 'webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set('topic', 'More webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete('topic');
searchParams.toString(); // "q=URLUtils.searchParams"

// ------------------------------------------------------------
// 获取 url 的域名、路径、referer 等

const pathname = '/post/nodejs/nodejs-http-getquery-qwurz4.html?nick=wenzi';

// 若pathname是绝对地址，则直接使用，否则用第2个参数进行拼接
// 若拼接后依然不是绝对地址，则抛出TypeError异常
const uu = new URL(pathname, 'http://localhost');
console.log(uu);

// ------------------------------------------------------------
// 修改 URL 的某一部分

const replaceUrlPath = (url) => {
  const uu = new URL(url, 'http://localhost');

  uu.pathname = uu.pathname.replace(/a/g, 'b'); // 对url的某一部分进行处理
  return uu.href;
};

replaceUrlPath('https://www.xiabingbao.com/post/javascript/url-handler-r7scei.html?a=b#main?c=123');
// https://www.xiabingbao.com/post/jbvbscript/url-hbndler-r7scei.html?a=b#main?c=123

// ------------------------------------------------------------
// 判断 url 地址是否为绝对地址

const isAbsolute = (url) => /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);

isAbsolute('http://localhost'); // true
isAbsolute('https://localhost'); // true
isAbsolute('file://localhost'); // true
isAbsolute('qqnews://localhost'); // true
isAbsolute('//localhost'); // true
isAbsolute('/api/list'); // false

// ------------------------------------------------------------
// 拼接 URL

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
 const combineURLs = (baseURL, relativeURL) => {
  // 将baseURL最后的斜杠和relativeURL最前面的斜杠去掉
  return relativeURL ? `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}` : baseURL;
};

combineURLs('https://www.xiabingbao.com/post/', '/request/axios-some-utils.html');
// 得到：https://www.xiabingbao.com/post/request/axios-some-utils.html

// ------------------------------------------------------------
// http 协议转成 https

/**
 * 将http链接转换为https链接
 * @param url 要转换的http链接
 */
 const http2https = (url) => {
  // 若不是以 http:// 开头，则原样返回
  return url.replace(/^http:\/\//, 'https://');
};
