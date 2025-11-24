sqlcmd -S localhost\SQLEXPRESS01 -E


EXEC xp_instance_regwrite
N'HKEY_LOCAL_MACHINE',
N'Software\Microsoft\MSSQLServer\MSSQLServer',
N'LoginMode',
REG_DWORD,
2;
GO
ALTER LOGIN sa ENABLE;
GO
ALTER LOGIN sa WITH PASSWORD = 'a79966960418';
GO
QUIT


sqlcmd -S localhost\SQLEXPRESS -U sa -P


