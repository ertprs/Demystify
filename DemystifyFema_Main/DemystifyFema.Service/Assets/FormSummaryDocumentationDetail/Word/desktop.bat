@echo off
for %%a in (*.docx) do ren "%%a" "123_%%a.docx"
ren *.docx *.