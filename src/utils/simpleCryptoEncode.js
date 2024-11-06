import CryptoJS from 'crypto-js'

export const SimpleCryptoEncode = (plaintText) => {
  // 将 textSteam 转换为 Base64 编码
  const textStreamBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(plaintText))
  const KEY = `${import.meta.env.VITE_CRYPTO_KEY}`
  const LOCKSTREAM = `${import.meta.env.VITE_CRYPTO_STREAM}`

  const stream = new Uint8Array(LOCKSTREAM.split('').map(c => c.charCodeAt(0)))
  // 生成随机数
  const lockCount = Math.floor(Math.random() * stream.length)
  // 从 stream 的 lockCount 位置获取一个字符
  const randomLock = String.fromCharCode(stream[lockCount])
  // // 用随机锁和密码拼接后加密
  const passwordHash = CryptoJS.MD5(KEY + randomLock).toString()
  let encodeStr = ''
  let k = 0
  let j = 0
  for (const ts of textStreamBase64) {
    if (k === passwordHash.length) {
      k = 0
    }
    j = stream.findIndex(r => r === ts.charCodeAt(0))
    j = (j + lockCount + passwordHash[k].charCodeAt(0)) % stream.length
    encodeStr += String.fromCharCode(stream[j])
    k++
  }
  return encodeStr + randomLock
}
