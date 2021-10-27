const { ZoomAnnotationToolType, ZoomAnnotationClearType, SDKViewType, ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomAnnotationCtrl = (function () {
  var instance;
  /**
  * Zoom Annotation Ctrl
  * @module zoom_annotation_ctrl
  * @return {ZoomAnnotationCtrl}
  */
  function init(opts) {
    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetMeetingAnnotation() || null;
    return {
      // Public methods and variables
      /**
       * Determine if the annotation tools are disabled or not for the specified view during the current meeting.
       * @method Annotaion_IsAnnotaionDisable
       * @return {Boolean} FALSE indicates enabled while TRUE indicates disabled.
       */
      Annotaion_IsAnnotaionDisable: function () {
        if (_addon) {
          return _addon.IsAnnoataionDisable();
        }
        return false;
      },
      /**
      * Display annotation toolbar.
      * @method Annotaion_StartAnnotation
      * @param {String} viewtype Specify which view to display the toolbar, Defined in: {@link SDKViewType}
      * @param {String} left Specify X-axis coordinate of the upper-left corner for the toolbar.
      * @param {String} top Specify Y-axis coordinate of the upper-left corner for the toolbar.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_StartAnnotation: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          let left = clientOpts.left;
          let top = clientOpts.top;
          try {
            let StartAnnotationParams = new messages.StartAnnotationParams();
            StartAnnotationParams.setViewtype(viewtype);
            StartAnnotationParams.setLeft(left);
            StartAnnotationParams.setTop(top);
            let bytes = StartAnnotationParams.serializeBinary();
            return _addon.StartAnnotation(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Close the current annotation toolbar.
      * @method Annotaion_StopAnnotation
      * @param {String} viewtype Specify which view to close the toolbar, Defined in: {@link SDKViewType}
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_StopAnnotation: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          try {
            let StopAnnotationParams = new messages.StopAnnotationParams();
            StopAnnotationParams.setViewtype(viewtype);
            let bytes = StopAnnotationParams.serializeBinary();
            return _addon.StopAnnotation(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Choose annotation tool.
      * @method Annotaion_SetTool
      * @param {String} viewtype Specify which view to display the toolbar, Defined in: {@link SDKViewType}
      * @param {String} toolType Specify the annotation tool to be used, Defined in: {@link ZoomAnnotationToolType}
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_SetTool: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          let toolType = clientOpts.toolType || ZoomAnnotationToolType.ANNOTOOL_NONE_DRAWING;
          try {
            let SetToolParams = new messages.SetToolParams();
            SetToolParams.setViewtype(viewtype);
            SetToolParams.setTooltype(toolType);
            let bytes = SetToolParams.serializeBinary();
            return _addon.SetTool(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Clear present annotations.
      * @method Annotaion_Clear
      * @param {String} viewtype Specify on which view to clear the annotations, Defined in: {@link SDKViewType}
      * @param {String} clearType Specify the ways to clear annotations, Defined in: {@link ZoomAnnotationClearType}
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_Clear: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          let clearType = clientOpts.clearType || ZoomAnnotationClearType.ANNOCLEAR_ALL;
          try {
            let ClearAnnotationParams = new messages.ClearAnnotationParams();
            ClearAnnotationParams.setViewtype(viewtype);
            ClearAnnotationParams.setCleartype(clearType);
            let bytes = ClearAnnotationParams.serializeBinary();
            return _addon.Clear(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the colors of annotation tools.
      * @method Annotaion_SetColor
      * @param {String} viewtype The specified color is used on which view, Defined in: {@link SDKViewType}
      * @param {String} color Specify the color of the annotation tools in RGB format
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_SetColor: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          let color = clientOpts.color;
          try {
            let SetColorParams = new messages.SetColorParams();
            SetColorParams.setViewtype(viewtype);
            SetColorParams.setColor(color);
            let bytes = SetColorParams.serializeBinary();
            return _addon.SetColor(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the line width of annotation tools.
      * @method Annotaion_SetLineWidth
      * @param {String} viewtype The specified line width is used on which view, Defined in: {@link SDKViewType}
      * @param {String} lineWidth Specify the line width to annotate
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_SetLineWidth: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          let lineWidth = clientOpts.lineWidth;
          try {
            let SetLineWidthParams = new messages.SetLineWidthParams();
            SetLineWidthParams.setViewtype(viewtype);
            SetLineWidthParams.setLinewidth(lineWidth);
            let bytes = SetLineWidthParams.serializeBinary();
            return _addon.SetLineWidth(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Undo the last annotation.
      * @method Annotaion_Undo
      * @param {String} viewtype Specify on which view to undo the last annotation, Defined in: {@link SDKViewType}
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_Undo: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          try {
            let UndoParams = new messages.UndoParams();
            UndoParams.setViewtype(viewtype);
            let bytes = UndoParams.serializeBinary();
            return _addon.Undo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Redo the last-undo annotation.
      * @method Annotaion_Redo
      * @param {String} viewtype Specify on which view to redo the last-undo annotation, Defined in: {@link SDKViewType}
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Annotaion_Redo: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || SDKViewType.ZNSDK_SEND_SHARE_VIEW;
          try {
            let RedoParams = new messages.RedoParams();
            RedoParams.setViewtype(viewtype);
            let bytes = RedoParams.serializeBinary();
            return _addon.Redo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determine whether the legal notice for annotation is available
      * @method Annotaion_IsAnnotationLegalNoticeAvailable
      * @return {Boolean} return True indicates the legal notice for annotation transcript is available. Otherwise False.
      */
      Annotaion_IsAnnotationLegalNoticeAvailable: function () {
        if (_addon){
          return _addon.IsAnnotationLegalNoticeAvailable();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the annotation legal notices prompt.
      * @method Annotaion_GetAnnotationLegalNoticesPrompt
      * @return {String}
      */
      Annotaion_GetAnnotationLegalNoticesPrompt: function () {
        if (_addon){
          return _addon.GetAnnotationLegalNoticesPrompt();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get Annotation Legal Notices Explained.
      * @method Annotaion_GetAnnotationLegalNoticesExplained
      * @return {String}
      */
      Annotaion_GetAnnotationLegalNoticesExplained: function () {
        if (_addon){
          return _addon.GetAnnotationLegalNoticesExplained();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      }
    };
  }
    return {
    getInstance: function (opts) {
      if(!instance) {
        instance = init(opts);
      }
      return instance;
    }
  };
})();

module.exports = {
  ZoomAnnotationCtrl: ZoomAnnotationCtrl
};
