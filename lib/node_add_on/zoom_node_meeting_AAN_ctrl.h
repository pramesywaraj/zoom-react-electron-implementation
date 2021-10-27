#ifndef _ZOOM_NODE_MEETING_AAN_CTRL_H_
#define _ZOOM_NODE_MEETING_AAN_CTRL_H_
#include "zoom_node_common_include.h"
#include "zoom_native_sdk_wrap_core.h"
#include "zoom_singleton_wrap_class.h"

extern ZNativeSDKWrap _g_native_wrap;
class ZOOM_NODE_HIDE ZoomNodeMeetingAANCtrlWrap :
	public ZoomWrapObject<ZoomNodeMeetingAANCtrlWrap >
{
	friend class ZoomWrapObject<ZoomNodeMeetingAANCtrlWrap >;
private:
	ZoomNodeMeetingAANCtrlWrap();
	~ZoomNodeMeetingAANCtrlWrap();
public:

	static void ShowAANPanel(const v8::FunctionCallbackInfo<v8::Value>& args);

	static void HideAANPanel(const v8::FunctionCallbackInfo<v8::Value>& args);

	static v8::Persistent<v8::Function> constructor;
};
template<>
static void InitClassAttribute<ZoomNodeMeetingAANCtrlWrap >(const v8::Local<v8::FunctionTemplate>& tpl, v8::Isolate* isolate)
{
	tpl->SetClassName(v8::String::NewFromUtf8(
		isolate, "ZoomNodeMeetingAANCtrlWrap", v8::NewStringType::kInternalized).ToLocalChecked());
	tpl->InstanceTemplate()->SetInternalFieldCount(1);

	// Prototype
	NODE_SET_PROTOTYPE_METHOD(tpl, "ShowAANPanel", ZoomNodeMeetingAANCtrlWrap::ShowAANPanel);
	NODE_SET_PROTOTYPE_METHOD(tpl, "HideAANPanel", ZoomNodeMeetingAANCtrlWrap::HideAANPanel);

}
template<>
static v8::Persistent<v8::Function>* GetConstructor<ZoomNodeMeetingAANCtrlWrap >() {
	return &ZoomNodeMeetingAANCtrlWrap::constructor;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#endif
