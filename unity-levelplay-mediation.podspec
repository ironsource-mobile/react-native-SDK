require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "unity-levelplay-mediation"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/ironsource-mobile/react-native-SDK.git", :tag => "v_9.0.0" }

  s.source_files = "ios/**/*.{h,mm}"

  s.resource_bundles = {
    'unity_levelplay_mediation' => ['ios/**/*.xib']
  }

  s.dependency "IronSourceSDK", "9.2.0.0"

  # React Native integration
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"

    if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
      folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1'

      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => "$(inherited) -std=c++17 -stdlib=libc++ -DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }

      s.dependency "React-RCTFabric"
      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
    end
  end
end
