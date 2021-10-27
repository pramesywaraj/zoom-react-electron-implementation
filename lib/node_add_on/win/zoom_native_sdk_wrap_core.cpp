#include "zoom_native_sdk_wrap_core.h"
//
#include "sdk_wrap.cpp"
#include "auth_service_wrap.cpp"
#include "meeting_service_wrap.cpp"
#include "setting_service_wrap.cpp"
#include "network_connection_handler_wrap.cpp"
#include "sdk_loader.cpp"
#include "ui_hook_wrap.cpp"
#include "embedded_browser_wrap.cpp"
#include "customized_resource_helper_wrap.cpp"
#include "meeting_service_components_wrap/meeting_annotation_wrap.cpp"
#include "meeting_service_components_wrap/meeting_audio_wrap.cpp"
#include "meeting_service_components_wrap/meeting_chat_wrap.cpp"
#include "meeting_service_components_wrap/meeting_configuration_wrap.cpp"
#include "meeting_service_components_wrap/meeting_h323_helper_wrap.cpp"
#include "meeting_service_components_wrap/meeting_participants_ctrl_wrap.cpp"
#include "meeting_service_components_wrap/meeting_phone_helper_wrap.cpp"
#include "meeting_service_components_wrap/meeting_recording_wrap.cpp"
#include "meeting_service_components_wrap/meeting_remote_ctrl_wrap.cpp"
#include "meeting_service_components_wrap/meeting_sharing_wrap.cpp"
#include "meeting_service_components_wrap/meeting_ui_ctrl_wrap.cpp"
#include "meeting_service_components_wrap/meeting_video_wrap.cpp"
#include "meeting_service_components_wrap/meeting_waiting_room_wrap.cpp"
#include "meeting_service_components_wrap/meeting_realname_auth_helper_wrap.cpp"
#include "meeting_service_components_wrap/meeting_interpretation_ctrl_wrap.cpp"
#include "meeting_service_components_wrap/meeting_emoji_reaction_wrap.cpp"
#include "meeting_service_components_wrap/meeting_AAN_helper_wrap.cpp"
//
#include "video_setting_context_wrap.cpp"
#include "audio_setting_context_wrap.cpp"
#include "recording_setting_context_wrap.cpp"
#include "camera_controller_wrap.cpp"
#include "meeting_service_components_wrap/meeting_live_stream_wrap.cpp"
#include "meeting_service_components_wrap/meeting_webinar_ctrl_wrap.cpp"
#include "meeting_service_components_wrap/meeting_closedcaption_ctrl_wrap.cpp"
#include "customized_ui_components_wrap/customized_ui_mgr_wrap.cpp"
#include "customized_ui_components_wrap/customized_annotation_wrap.cpp"
#include "directshare_helper_wrap.cpp"
#include "zoom_native_to_wrap.h"
#include "resource.h"

#include "rawdata/zoom_rawdata_api.h"

#define ENABLE_CUSTOMIZED_UI_FLAG (1 << 5)
std::string wsTOs(const ZoomSTRING& s)
{

	int len;
	int slength = (int)s.length() + 1;
	len = WideCharToMultiByte(CP_UTF8, 0, s.c_str(), slength, 0, 0, 0, 0);
	std::string r(len, '\0');
	WideCharToMultiByte(CP_UTF8, 0, s.c_str(), slength, &r[0], len, 0, 0);
	return r;
}

void DummyFunc()
{
	int i = i / 0;
	printf("%d", i);
}
ZNSDKError ZNativeSDKWrap::InitSDK(ZNInitParam& initParam)
{
	ZOOM_SDK_NAMESPACE::InitParam param;
	param.emLanguageID = Map2SDKDefine(initParam.langid);
	param.strWebDomain = initParam.domain.c_str();
	param.enableLogByDefault = initParam.enable_log;
	param.enableGenerateDump = initParam.enableGeneratDump;
	param.strSupportUrl = initParam.strSupportUrl.c_str();
	std::string strLangName = wsTOs(initParam.obConfigOpts.customizedLang.langName);
	std::string strlangInfo = wsTOs(initParam.obConfigOpts.customizedLang.langInfo);
	param.obConfigOpts.customizedLang.langName = strLangName.c_str();
	param.obConfigOpts.customizedLang.langInfo = strlangInfo.c_str();
	param.obConfigOpts.customizedLang.langType = Map2SDKDefine(initParam.obConfigOpts.customizedLang.langType);
	param.locale = Map2SDKDefine(initParam.locale);
	param.uiLogFileSize = initParam.logFileSize;
	param.permonitor_awareness_mode = initParam.permonitor_awareness_mode;

	param.renderOpts.videoRenderMode = Map2SDKDefine(initParam.renderOpts.videoRenderMode);
	param.renderOpts.renderPostProcessing = Map2SDKDefine(initParam.renderOpts.renderPostProcessing);
	param.renderOpts.videoCaptureMethod = Map2SDKDefine(initParam.renderOpts.videoCaptureMethod);
	param.rawdataOpts.enableRawdataIntermediateMode = initParam.rawdataOpts.enableRawdataIntermediateMode;
	ZoomNodeRawDataHelperMgr::GetInst().SetRawdataIntermediateMode(initParam.rawdataOpts.enableRawdataIntermediateMode);
	param.rawdataOpts.audioRawdataMemoryMode = Map2SDKDefine(initParam.rawdataOpts.audioRawdataMemoryMode);
	param.rawdataOpts.videoRawdataMemoryMode = Map2SDKDefine(initParam.rawdataOpts.videoRawdataMemoryMode);
	param.rawdataOpts.shareRawdataMemoryMode = Map2SDKDefine(initParam.rawdataOpts.shareRawdataMemoryMode);
	if (initParam.obConfigOpts.useCustomUI)
	{
		param.obConfigOpts.optionalFeatures = ENABLE_CUSTOMIZED_UI_FLAG;
	}

	HMODULE hRes = NULL;
	param.uiWindowIconSmallID = IDI_SDK_ICON;
	param.uiWindowIconBigID = IDI_SDK_BIG_ICON;
	GetModuleHandleEx(GET_MODULE_HANDLE_EX_FLAG_FROM_ADDRESS, (LPCSTR)DummyFunc, &hRes);
	param.hResInstance = hRes;
	FreeLibrary(hRes);

	

	ZNSDKError err = Map2WrapDefine(ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().InitSDK(
		initParam.path.size() > 0 ? initParam.path.c_str() : NULL, param));
	if (ZNSDKERR_SUCCESS == err)
	{
		_z_auth_service_wrap.Init();
	}
	return err;
}
ZNSDKError ZNativeSDKWrap::CleanUPSDK()
{
	ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().CleanUPSDK();
	return ZNSDKERR_SUCCESS;
}
ZoomSTRING ZNativeSDKWrap::GetVersion()
{

	ZoomSTRING zn_version;
	zn_version = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSDKVersion();
	return zn_version;
}
ZNativeSDKWrap::ZNativeSDKWrap()
{
}
ZNativeSDKWrap::~ZNativeSDKWrap()
{
}
ZAuthServiceWrap& ZNativeSDKWrap::GetAuthServiceWrap()
{
	return _z_auth_service_wrap;
}
ZMeetingServiceWrap& ZNativeSDKWrap::GetMeetingServiceWrap()
{
	return _z_meeting_service_wrap;
}
ZSettingServiceWrap& ZNativeSDKWrap::GetSettingServiceWrap()
{
	return _z_setting_service_wrap;
}

ZCustomizedResourceWrap& ZNativeSDKWrap::GetCustomizedResourceWrap()
{
	return _z_customized_resource_wrap;
}
ZNativeRawAPIWrap& ZNativeSDKWrap::GetRawAPIWrap()
{
	return _z_raw_api_wrap;
}
