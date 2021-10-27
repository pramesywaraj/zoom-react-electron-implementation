#include "zoom_node_meeting_AAN_ctrl.h"


ZoomNodeMeetingAANCtrlWrap::ZoomNodeMeetingAANCtrlWrap()
{

}

ZoomNodeMeetingAANCtrlWrap::~ZoomNodeMeetingAANCtrlWrap()
{
	
}
void ZoomNodeMeetingAANCtrlWrap::ShowAANPanel(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::ShowAANPanelParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::ShowAANPanelParams >(args, proto_params))
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		if (!proto_params.has_x() ||
			!proto_params.has_y() ||
			!proto_params.has_windowid()
			)
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		uint32_t x = proto_params.x();
		uint32_t y = proto_params.y();
		uint32_t windowID = proto_params.windowid();

		err = _g_native_wrap.GetMeetingServiceWrap().GetMeetingAANCtrl().ShowAANPanel(x, y, windowID);
	} while (false);

	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeMeetingAANCtrlWrap::HideAANPanel(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	err = _g_native_wrap.GetMeetingServiceWrap().GetMeetingAANCtrl().HideAANPanel();
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
