const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingAAN = (function () {
  let instance;
  /**
   * Zoom Meeting AAN
   * @module zoom_meeting_aan
   * @return {ZoomMeetingAAN}
   */
  function init(opts) {
    
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetMeetingAAN() || null;

    return {
      /** 
      * Show AAN panel window.
      * @method ShowAANPanel
      * @param {Number} x the horizontal coordinate value. 
      * @param {Number} y the vertical coordinate value. 
      * @param {Number} windowID only support for MAC platform
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      ShowAANPanel: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let x = clientOpts.x || 0;
          let y = clientOpts.y || 0;
          let windowID = clientOpts.windowID || 0;
          try {
            let ShowAANPanelParams = new messages.ShowAANPanelParams();
            ShowAANPanelParams.setX(Number(x));
            ShowAANPanelParams.setY(Number(y));
            ShowAANPanelParams.setWindowid(Number(windowID));
            let bytes = ShowAANPanelParams.serializeBinary();
            return _addon.ShowAANPanel(bytes);            
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * Hide AAN panel window.
      * @method HideAANPanel
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      HideAANPanel: function () {
        if (_addon) {
          return _addon.HideAANPanel();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      }
    };
};
  return {
    getInstance: function (opts) {
      if (!instance) {
        instance = init(opts)
      }
      return instance
    }
  };
})();

module.exports = {
  ZoomMeetingAAN: ZoomMeetingAAN
}