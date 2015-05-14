echo Windows Registry Editor Version 5.00>add_tor_protocol_handler.reg

echo [HKEY_CLASSES_ROOT\Tor]>>add_tor_protocol_handler.reg
echo ^@="TOR URI">>add_tor_protocol_handler.reg
echo "URL Protocol"="">>add_tor_protocol_handler.reg
echo "Content Type"="application/TOR">>add_tor_protocol_handler.reg
echo "EditFlags"=dword:00000002>>add_tor_protocol_handler.reg
echo "FriendlyTypeName"="Allows Executing TOR from inside web browsers such as Chrome">>add_tor_protocol_handler.reg

echo [HKEY_CLASSES_ROOT\Tor\DefaultIcon]>>add_tor_protocol_handler.reg
echo ^@="">>add_tor_protocol_handler.reg

echo [HKEY_CLASSES_ROOT\Tor\shell]>>add_tor_protocol_handler.reg
echo ^@="open">>add_tor_protocol_handler.reg

echo [HKEY_CLASSES_ROOT\Tor\shell\open]>>add_tor_protocol_handler.reg

echo [HKEY_CLASSES_ROOT\Tor\shell\open\command]>>add_tor_protocol_handler.reg
echo ^@="\"C:\\Users\\%username%\\AppData\\Roaming\\Israeli-IronChrome\\TorExpertBundle\\Tor.exe\"">>add_tor_protocol_handler.reg
regedit -s add_tor_protocol_handler.reg
echo y|del add_tor_protocol_handler.reg
exit
