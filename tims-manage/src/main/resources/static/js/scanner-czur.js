var fileDirect = null // 扫描后文件的存放路径
var defaultFileName = null
var imageUrlList = []
var imageFileList = []
var gAngle = 0

$(function () {
  window.ScannerOcx = {
    start: function () {
      if (!isOcxInstalled()) {
        return false
      }
      czurOcxStartDevice()
    },
    scan: function () {
      if (!isOcxInstalled()) {
        return false
      }
      CZUR_GrabSingleImage()
    },
    merge: function () {
      if (!isOcxInstalled()) {
        return false
      }
      czurOcxMergeImageToPdf()
    },
    upload: function () {
      if (!isOcxInstalled()) {
        return false
      }
      uploadPdfBase64()
      // CZUR_Http_Upload()
    },
    close: function () {
      if (!isOcxInstalled()) {
        return false
      }
      czurOcxCloseDevice()
    }
  }

  addEventListeners()
  ScannerOcx.start()
})

// 检测Ocx控件是否安装
function isOcxInstalled () {
  try {
    if (!window.EtOcxEx) {
      $notify('CZUR高拍仪Ocx控件未正确加载，请确保在IE8~IE11环境下，并且Ocx控件已正确加载，如有任何问题，请联系管理员！', 'danger')
      return false
    }
  } catch (error) {
    $notify('CZUR高拍仪Ocx控件未正确加载，请确保在IE8~IE11环境下，并且Ocx控件已正确加载，如有任何问题，请联系管理员！', 'danger')
    return false
  }
  return true
}

function addEventListeners () {
  if (window.attachEvent) {
    document.getElementById('EtOcxEx').attachEvent('CZUR_CALLBACK', JS_CZUR_CALLBACK)
    document.getElementById('EtOcxEx').attachEvent('CZUR_UPLOAD_CALLBACK', JS_CZUR_UPLOAD_CALLBACK)
    document.getElementById('EtOcxEx').attachEvent('CZUR_PDF_CALLBACK', JS_CZUR_PDF_CALLBACK)
  } else if (window.addEventListener) {
    document.getElementById('EtOcxEx').addEventListener('CZUR_CALLBACK', JS_CZUR_CALLBACK, false)
    document.getElementById('EtOcxEx').addEventListener('CZUR_UPLOAD_CALLBACK', JS_CZUR_UPLOAD_CALLBACK, false)
    document.getElementById('EtOcxEx').addEventListener('CZUR_PDF_CALLBACK', JS_CZUR_PDF_CALLBACK, false)
  }
}

function czurOcxStartDevice () {
  var breadth = 0 // A3幅面
  var detect = 1 // 边缘检测
  var res = CZUR_Initialize() &&
    CZUR_ScanBreadth(breadth) &&
    CZUR_EdgeDetect(detect) &&
    CZUR_EdgeCutting() &&
    CZUR_Zoom(1600, 1200) &&
    CZUR_Format_Jpg(50) &&
    CZUR_DPI(72) &&
    CZUR_OpenDevice()

  if (res) {
    var breadthLabel = breadth === 0 ? 'A3幅面' : 'A4幅面'
    var detectLabel = detect === 1 ? '开启' : '关闭'
    // console.log('启动设备成功,扫描幅面：' + detectLabel + '；边缘检测:' + breadthLabel + '；开启自动裁边;')
  }
}

function czurOcxScan () {
  CZUR_GrabSingleImage()
}

function czurOcxCloseDevice () {
  CZUR_CloseDevice()
  CZUR_Deinitialize()
}

function czurOcxMergeImageToPdf () {
  imageFileList = imageFileList || []
  for (var i = 0; i < imageFileList.length; i++) {
    // console.log(JSON.stringify(imageFileList[i]))
    CZUR_Pdf_Image(imageFileList[i].filePath)
  }
  CZUR_Pdf_Submit()
}

function CZUR_Initialize () {
  var lInitialize = window.EtOcxEx.CZUR_Initialize('JS_OCX.log')
  if (lInitialize === 0) {
    $notify('设备初始化失败！')
    return false
  }
  // console.log('设备初始化成功！')
  return true
}
// 打开设备 0：失败，1：成功，2：设备未连接或型号不支持（不支持ET16、ET18U）
function CZUR_OpenDevice () {
  var bOpenDevice = window.EtOcxEx.CZUR_OpenDevice()
  if (bOpenDevice === 0) {
    $notify('打开设备失败！请确认设备是否已启动，如未启动，请再次点击启动按钮或刷新页面；如果设备已启动，无需重复点击。')
    return false
  } else if (bOpenDevice === 1) {
    // console.log('打开设备成功')
    return true
  } else {
    $notify('请检查设备是否连接或型号是否支持')
    return false
  }
}
// 触发设备进行拍照 0：失败，1：成功
function CZUR_GrabSingleImage () {
  var res = window.EtOcxEx.CZUR_GrabSingleImage()
  if (res === 0) {
    $notify('扫描图像失败！')
    return false
  }
  $notify('扫描图像成功！正在保存图片到本地...')
  return true
}
// 关闭设备
function CZUR_CloseDevice () {
  var res = window.EtOcxEx.CZUR_CloseDevice()
  if (res === 0) {
    $notify('关闭设备失败')
  } else {
    $notify('关闭设备成功')
  }
}
// 设置扫描幅面，0：A3幅面，1：A4幅面，默认A3幅面
function CZUR_ScanBreadth (breadth) {
  // console.log('设置扫描幅面：' + (breadth === 0 ? 'A3幅面' : 'A4幅面'))
  window.EtOcxEx.CZUR_ScanBreadth(breadth)
  return true
}
// 是否开启边缘检测，0：关闭，1：开启
function CZUR_EdgeDetect (detect) {
  // console.log((detect === 0 ? '关闭' : '开启') + '边缘检测')
  window.EtOcxEx.CZUR_EdgeDetect(detect)
  return true
}
// 清除Ocx资源
function CZUR_Deinitialize () {
  // console.log('清除控件内存资源')
  window.EtOcxEx.CZUR_Deinitialize()
}
// 设置图片保存路径
function CZUR_Path (path) {
  // console.log('设置图片保存路径', path)
  window.EtOcxEx.CZUR_Path(path)
}
// 自定义图片命名规则
function CZUR_Custom (prefix, initNumber) {
  initNumber = initNumber || 1
  // console.log('自定义图片命名规则', '前缀：' + prefix + ', 图片起始序号：' + initNumber)
  window.EtOcxEx.CZUR_Custom(prefix, initNumber)
}
function CZUR_Http_URL () {
  var url = 'http://192.168.1.112:10060/fast/upload?billNo=1111&billTypeId=2222&classifyId=33333'
  var name = 'file'
  window.EtOcxEx.CZUR_Http_URL(url, name)
  return true
}
function CZUR_Http_Form (name, content) {
  window.EtOcxEx.CZUR_Http_Form(name, content)
}
//  自动对图片进行裁边处理
function CZUR_EdgeCutting () {
  // console.log('自动对图片进行裁边处理')
  window.EtOcxEx.CZUR_EdgeCutting()
  return true
}
// 添加用于合成pdf的图片文件
function CZUR_Pdf_Image (filePath) {
  var res = window.EtOcxEx.CZUR_Pdf_Image(filePath)
  if (res === 0) {
    // console.log('添加用于合成PDF的图片文件添加成功' + '图片路径：' + filePath)
    return true
  }
  $notify('添加图片失败' + filePath)
  return false
}

// 设置分辨率（长*宽）
function CZUR_Zoom (xResolut, yResolut) {
  EtOcxEx.CZUR_Zoom(xResolut.value, yResolut.value)
  return true
}

// 设置图片压缩质量（1-100）
function CZUR_Format_Jpg (quality) {
  EtOcxEx.CZUR_Format_Jpg(quality)
  return true
}

function CZUR_DPI (dpi) {
  EtOcxEx.CZUR_DPI(dpi || 96)
  return true
}

// 将添加的图片文件合成PDF文档
function CZUR_Pdf_Submit (filePath) {
  var defaultPath = fileDirect || 'D:'
  defaultFileName = 'CZUR_' + getDateTimeString() + '.pdf'
  filePath = filePath || defaultPath + '\\' + defaultFileName
  var res = window.EtOcxEx.CZUR_Pdf_Submit(filePath)
  if (res === 0) {
    $notify('合成pdf成功' + '正在生成pdf并保存到本地：' + filePath)
  } else {
    $notify('合成PDF失败')
  }
}
function uploadPdfBase64 () {
  var localfile = fileDirect + '\\' + defaultFileName
  $notify('准备上传PDF中...')
  setTimeout(function () {
    var base64 = CZUR_Base64(localfile)
    $notify('上传PDF中，请稍候...')
    setTimeout(function () {
      ScannerHome.uploadPdfBase64(defaultFileName, base64, function (fileUrl) {
        $notify('上传PDF成功！' + fileUrl)
        ScannerHome.reloadFileList()
      })
    }, 0)
  }, 0)
}

function CZUR_Http_Upload () {
  var localfile = fileDirect + '\\' + defaultFileName
  // console.log(localfile)
  var url = 'http://192.168.1.112:10060/fast/upload?billNo=1111&billTypeId=2222&classifyId=33333'
  var name = 'file'
  var username = ''
  var password = ''
  var res = window.EtOcxEx.CZUR_Http_Upload(localfile, url, name, username, password)
  if (res == 1) {
    $notify('未初始化EtOcxEx资源')
    return false
  }
  if (res == 2) {
    $notify('本地文件不存在')
    return false
  }
  if (res == 3) {
    $notify('上传PDF失败，错误码：3')
    return false
  }
  if (res == 0) {
    return true
  }
}

// 获取图片的Base64的值
function CZUR_Base64 (iamgePath) {
  var base64 = window.EtOcxEx.CZUR_Base64(iamgePath)
  return base64
}

// 设置图片旋转
function CZUR_Rotate (angle) {
  EtOcxEx.CZUR_Rotate(angle)
  $notify('设置旋转：' + angle + '度')
}

function CZUR_SelectType (selType) {
  EtOcxEx.CZUR_SelectType(selType)
}

function JS_CZUR_CALLBACK (uploadcnt, barcode, httpinfo, imagefile1, imagefile2) {
  $notify('图片已保存到本地' + imagefile1)
  if (uploadcnt && httpinfo) {
    // console.log(httpinfo)
    var res = JSON.parse(httpinfo)
    // console.log(res.data)
  }
  addThumbnail(imagefile1)
  if (imagefile2) {
    addThumbnail(imagefile2)
  }
}

function addThumbnail (filePath) {
  fileDirect = filePath.slice(0, filePath.lastIndexOf('\\'))
  var fileName = filePath.slice(filePath.lastIndexOf('\\') + 1)
  // console.log(fileDirect)
  // console.log(fileName)
  var base64 = CZUR_Base64(filePath)
  ScannerHome.uploadImageBase64Preview(base64, fileName, filePath,
    function (fileUrl, thumbImageUrl) {
      imageFileList.push({
        imageId: new Date().getTime(),
        fileName: fileName,
        filePath: filePath,
        localPath: filePath,
        fileUrl: fileUrl,
        thumbImageUrl: thumbImageUrl
      })
    }
  )
}

function JS_CZUR_UPLOAD_CALLBACK (uploadcnt, localfile, errcode, errmsg) {
  $notify('文件上传成功' + '上传的本地文件地址为：' + localfile)
  // console.log(uploadcnt, localfile, errcode, errmsg)
}

function JS_CZUR_PDF_CALLBACK (pdfstatus) {
  if (pdfstatus === 0) {
    $notify('生成PDF成功！文件保存地址：' + defaultFileName)
  } else {
    $notify('生成PDF失败！')
  }
}

function JS_CZUR_CAPTURE_CALLBACK (reserver) {
  // console.log('拍摄图片')
  // console.log(reserver)
}

function getDateTimeString () {
  var date = new Date()
  var Year = date.getFullYear()
  var Month = date.getMonth() + 1
  var Dates = date.getDate()
  var Hour = date.getHours()
  var Minite = date.getMinutes()
  var Second = date.getSeconds()
  return '' + Year + Month + Dates + Hour + Minite + Second
}
