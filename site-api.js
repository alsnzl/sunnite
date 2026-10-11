;(function (global) {
  function cfg() {
    var c = global.SUNNITE_CONFIG || {}
    if (!c.supabaseUrl || !c.supabaseAnonKey) {
      throw new Error('config')
    }
    return c
  }

  function fnUrl(name) {
    return cfg().supabaseUrl.replace(/\/$/, '') + '/functions/v1/' + name
  }

  async function callFn(name, body, extraHeaders) {
    var c = cfg()
    var headers = {
      'Content-Type': 'application/json',
      apikey: c.supabaseAnonKey,
      Authorization: 'Bearer ' + c.supabaseAnonKey,
    }
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach(function (k) {
        headers[k] = extraHeaders[k]
      })
    }
    var res = await fetch(fnUrl(name), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body || {}),
    })
    var data = null
    try {
      data = await res.json()
    } catch (_) {
      data = null
    }
    if (!res.ok) {
      var err = new Error((data && data.error) || 'request_failed')
      err.status = res.status
      err.data = data
      throw err
    }
    return data
  }

  global.SunniteApi = {
    createInquiry: function (payload) {
      return callFn('site-inquiry-create', payload)
    },
    viewInquiry: function (code, pin) {
      return callFn('site-inquiry-view', { code: code, pin: pin })
    },
    adminList: function (secret) {
      return callFn('site-inquiry-admin', { action: 'list' }, { 'x-admin-secret': secret })
    },
    adminReply: function (secret, code, reply) {
      return callFn(
        'site-inquiry-admin',
        { action: 'reply', code: code, reply: reply },
        { 'x-admin-secret': secret },
      )
    },
  }
})(window)
