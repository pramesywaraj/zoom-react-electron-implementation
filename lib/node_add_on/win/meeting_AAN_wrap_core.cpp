
#include "meeting_AAN_wrap_core.h"
#include "sdk_wrap.h"
#include "meeting_service_components_wrap/meeting_AAN_helper_wrap.h"
#include "zoom_native_to_wrap.h"
#include "sdk_events_wrap_class.h"
extern ZOOM_SDK_NAMESPACE::IMeetingServiceWrap& g_meeting_service_wrap;

ZMeetingAANWrap::ZMeetingAANWrap()
{

}
ZMeetingAANWrap::~ZMeetingAANWrap()
{
	Uninit();
}
void ZMeetingAANWrap::Init()
{
	ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetMeetingServiceWrap().T_GetMeetingAANController().Init_Wrap(&g_meeting_service_wrap);
}
void ZMeetingAANWrap::Uninit()
{
	ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetMeetingServiceWrap().T_GetMeetingAANController().Uninit_Wrap();
}

ZNSDKError ZMeetingAANWrap::ShowAANPanel(uint32_t x, uint32_t y, uint64_t windowID)
{
	return Map2WrapDefine(ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetMeetingServiceWrap().T_GetMeetingAANController().ShowAANPanel(x,y));
}
ZNSDKError ZMeetingAANWrap::HideAANPanel()
{
	return Map2WrapDefine(ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetMeetingServiceWrap().T_GetMeetingAANController().HideAANPanel());

}