#pragma once
#include "zoom_native_sdk_wrap_core_def.h"
#include "zoom_sinks_wrap_class.h"

class ZMeetingAANWrap
{
public:
	ZMeetingAANWrap();
	virtual ~ZMeetingAANWrap();
	void Init();
	void Uninit();

	ZNSDKError ShowAANPanel(uint32_t x, uint32_t y, uint64_t windowID);
	ZNSDKError HideAANPanel();
};
