#include "meeting_service_wrap_core.h"
#include "meeting_AAN_wrap_core.h"
#include "Header_include.h"
#include "sdk_native_error.h"

ZMeetingAANWrap& ZMeetingServiceWrap::GetMeetingAANCtrl()
{
    return m_meeting_AAN_ctrl;
}

ZMeetingAANWrap::ZMeetingAANWrap()
{
   
}
ZMeetingAANWrap::~ZMeetingAANWrap()
{

}
void ZMeetingAANWrap::Init()
{

}
void ZMeetingAANWrap::Uninit()
{

}

ZNSDKError ZMeetingAANWrap::ShowAANPanel(uint32_t x, uint32_t y, uint64_t windowID)
{
    ZoomSDKMeetingService *service = [[ZoomSDK sharedSDK] getMeetingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKAppSignalController *controller = [service getAppSignalController];
    if (!controller) {
        return ZNSDKERR_SERVICE_FAILED;
    }
    NSPoint point = NSMakePoint(x, y);

    CFArrayRef windowInfoArray = CGWindowListCopyWindowInfo(kCGWindowListOptionIncludingWindow, (CGWindowID)windowID);
    NSArray *arr = CFBridgingRelease(windowInfoArray);
    if (!arr || arr.count == 0)
        return ZNSDKERR_WRONG_USEAGE;

    NSMutableDictionary *winDic = arr[0];
    NSInteger wndNumber=[[winDic objectForKey:(id)kCGWindowNumber] intValue];
    NSWindow *window = [NSApp windowWithWindowNumber:wndNumber];
    if(!window)
        return ZNSDKERR_WRONG_USEAGE;
    ZoomSDKError ret = [controller showAANPanel:point parentWindow:window];
    nativeErrorTypeHelp  Help_type;
    return Help_type.ZoomSDKErrorType(ret);
}

ZNSDKError ZMeetingAANWrap::HideAANPanel()
{
    ZoomSDKMeetingService *service = [[ZoomSDK sharedSDK] getMeetingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKAppSignalController *controller = [service getAppSignalController];
    if (!controller) {
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKError ret = [controller hideAANPanel];
    nativeErrorTypeHelp  Help_type;
    return Help_type.ZoomSDKErrorType(ret);

}
