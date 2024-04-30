# Google Sheets and Excel

## Formulas

https://support.google.com/docs/table/25273


### References to cells

	INDIRECT("Sheet2!B" & C2)

Dynamically get row/column from another sheet

	=INDIRECT("Sheet name!r" & ROW($A2) & "c" & (COLUMN(B$1)-1), false)

R2C2


Import another workbook

	=IMPORTRANGE("https://docs.google.com/spreadsheets/d/1W2nFTQxcJ7DSNMKPEaY6IcFBbrlFjWl6pSccK6xBzs0", "'Countries'!D:H")

Import one value/cell

	=IMPORTRANGE("https://docs.google.com/spreadsheets/d/1s7EhvdUNERn7cOHjBovu-L39e6I4T7KPuKsOJlneavg", "'Sheet1'!E$3")


### Numbers

	=CEILING(number, 0.5)

	RANDBETWEEN(1, 2)

Multiply two columns, e.g. `calendar-days * usage%`

	=SUM(ARRAYFORMULA($C2:$C12*F2:F12))


### Strings/Text

	CHAR(65)
	CODE("A")

	=IF(C2<>""; "OK"; "")

capitalize/title

	=PROPER("tom")

Search:

	SEARCH(search_for, text_to_search, starting_at) - not case-sensitive
	FIND(search_for, text_to_search, starting_at) - case-sensitive

Left of comma

	=left(B2, find(",", B2)-1)

Right of comma

	=right(B2, len(B2)-find(",", B2))

Split string to array

	=SPLIT(A2, ";", FALSE)

INDEX(array, row, column)

	=INDEX(SPLIT("1.23/1.15", "/"), 0, 2)

Join/concatenate cells to string

	=JOIN(";",{1,2,"1 2 3 4"})
	=JOIN(" / ",C2 & " " & D2,M2,N2)

Get string minus two last characters

	=LEFT(B2,LEN(B2)-2)

// Find in cell: true if found
=NOT(ISERR(SEARCH("keyword", F2)))

// Find in cell: 1 if found, otherwise 0
=IF(ISERR(SEARCH("keyword", F2)),0,1)


SUBSTITUTE(text_to_search, search_for, replace_with, occurrence_number)
SUBSTITUTE(D20,"x","y")
REPLACE(text, position, length, new_text)

Check if string in cell:
=ISNUMBER(SEARCH("mystring", D2))
=OR(ISNUMBER(SEARCH("option1", H2)), ISNUMBER(SEARCH("option2", H2)))
=IF(ISNUMBER(SEARCH("mystring", D2)), "Found", "Not found")

Check if any of multiple strings in cell:
=REGEXMATCH(A1;"Dog|Cat")
=ArrayFormula(IF(COUNT(SEARCH({"Cat","Dog"},A1)),"1","0"))

Random string
=CHOOSE(RANDBETWEEN(1, 2), "choice1", "choice2")
=RANDBETWEEN(0,9) // a random number
=CHAR(RANDBETWEEN(65,90)) // an uppercase letter
=CHAR(RANDBETWEEN(97,122)) // a lowercase letter
=CHAR(RANDBETWEEN(33,47)) // a special character
=CHOOSE(RANDBETWEEN(1, 2), CHAR(RANDBETWEEN(65,90)), CHAR(RANDBETWEEN(97,122)))
=CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))

Password generator:

    =CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & "-"
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))
    & CHOOSE(RANDBETWEEN(1, 2), RANDBETWEEN(0,9), CHAR(RANDBETWEEN(97,122)))

Random from list:

    =CHOOSEROWS(A:A, RANDBETWEEN(2, COUNTA(A:A)))

### Date & Time

Format date as text:
=TEXT(D26+1, "YYYY-MM-DD")

=ROUND((NOW()-DATE(1970,1,1))*86400)
=ROUND((NOW()-DATE(1970,1,1))*86400000-7205600)


### Money

=GOOGLEFINANCE("CadSek")


### Arrays / Tables

// List lookup
=vlookup(C284,Suppliers!A:D,4,false)

// Find in list: X if found, otherwise blank
=IF(NOT(ISNA(VLOOKUP("keyword",Domains!A:A,1,false))),"X","")
// Find in list: true if found
=NOT(ISNA(VLOOKUP("keyword",'Förnamn'!A:A,1,false)))

// List lookup - blank if not found
=if(isna(vlookup(D2, Regions!A:B,2,false)),"",vlookup(D2, Regions!A:B,2,false))



### Last row

In  general the last item of a column can be found like this:
=INDEX(SORT(A:A;ROW(A:A);FALSE);1)

Second last row:
=INDIRECT("'Manual input'!D" & ROWS('Manual input'!D:D)-1)

To get the last non-blank value is a bit more convoluted, e.g. like this:
=INDEX(FILTER(A:A;NOT(ISBLANK(A:A)));ROWS(FILTER(A:A;NOT(ISBLANK(A:A)))))

To get the last row of a submitted data (e.g. in columns A...Z) is a tiny bit easier, because you can use the Timestamp value to sort on, e.g. like this:
=INDEX(SORT(A2:Z;1;FALSE);1)


### Contact Lists

Slug/slug:
=SUBSTITUTE(LOWER($A2), " ", "-")
=REGEXREPLACE(SUBSTITUTE(LOWER(Name), " ", "-"), "[^a-zA-Z0-9\\-]", "")
Camelcase:
=REGEXREPLACE(LOWER(LEFT($A3)) & MID(SUBSTITUTE(PROPER($A3)," ",""), 2, LEN($A3)), "[^A-Za-z0-9]+","")

FirstName from full name:
=REGEXEXTRACT($A2, "(\S*) ")
FirstName from email:
=REGEXEXTRACT($A2, "(\w*)[\.@]")
LastName from full name:
=REGEXEXTRACT($A2, " (.*)")
LastName from full name and email:
=REGEXEXTRACT($A2, " (.*) \<")
LastName from email:
=REGEXEXTRACT($$A2, "\.(\w*)@")

Get FirstName:
=LEFT(A2, FIND(" ", A2)-1)

Get LastName:
=RIGHT(A2, LEN(A2) - FIND(" ", A2))

=HYPERLINK("https://www.google.com/search?q=" & $A2, "(search)")

ÅÄÖ characters
=SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE('Prospectify CSV'!AA2,"ä","a"),"å","a"),"ö","o"),"é","e")

Email from "FirstName LastName <email@gmail.com>":
=REGEXEXTRACT($A2, "\<(.*)\>")
Domain without RegEx:
=INDEX(SPLIT($A2,"."),LEN($A2)-len(SUBSTITUTE($A2,".","")))
Domain with RegEx:
=REGEXEXTRACT($A2, "@(.*)")
Domain TLD/suffix:
=REGEXEXTRACT($A2, "\.(\w*)$")
Website domain from URL:
=REGEXEXTRACT(A1, "https?://w*\.*([^/]+)")

Get email domain:
=RIGHT(C2; LEN(C2) - FIND("@"; C2))

Get email domain suffix:
=RIGHT(A2, LEN(A2)-FIND(".", A2, FIND("@", A2)))
=RIGHT(E2; LEN(E2)-FIND("."; E2))

Format name + website → email
=SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(LOWER(C2 &"." & D2),"ö","o"),"ä","a"),"å","a"),"é","e"),"è","e"),"ü","u"),"ø","o"),"í","i")," ",".") & "@" & REGEXEXTRACT(D2, "https?://w*\.*([^/]+)")
=SUBSTITUTE(LOWER(C1);" ";".") & "@" & REGEXEXTRACT(A1, "https?://w*\.*([^/]+)")
(separate names)
=LOWER(E2 &"."& F2) & "@" & REGEXEXTRACT(D2, "https?://w*\.*([^/]+)")

Format name + company → email
=LOWER(SUBSTITUTE(C6;" ";".") & "@" & D6 & ".se")

Format Firstname + Lastname + company → email
=LOWER(B6 & "." & C6 & "@" & D6 & ".se")

Gmail string formatting
=B2 & " " & C2 & " <" & A2 & ">"

Is interesting? Contains any of
=if(isna(vlookup(G2,Domains!A$1:A$3,1,false)),"YES","-")

Google "I'm Feeling Lucky"
="https://www.google.com/search?btnI&q=" & A1

Google search:
="https://www.google.com/?#q=" & SUBSTITUTE(C3; " "; "%20")

Segment users into random groups of 50 each:
="group_" & char(randbetween(code("a"),code("a")+round(counta(F:F)/50)))


JSON:

="{" & CHAR(10)
& """recipient"": """ & A3 & """," & CHAR(10)
& """score"": " & B3 & "," & CHAR(10)
& """message"": """ & E3 & """," & CHAR(10)
& "}"

File paths:

Split paths by / and get filename:

=INDEX(SPLIT(A2,"/"),1,COUNTA(SPLIT(A2,"/")))


### Filters

Remember to us the cell UNDER the filter heading in the formula, so if your filter is on C1, use C2:
https://webapps.stackexchange.com/questions/67381/is-there-any-way-to-use-a-formula-in-a-google-sheets-filter-view

=OR(FIND("ica.se",F2), FIND("vi-butikerna.se",F2))


=NOT(OR(ISNUMBER(FIND("ica.se",H2)), ISNUMBER(FIND("vi-butikerna.se",H2))))

ISNUMBER


### Trends

Trends

Count frequency of values
FREQUENCY(data; classes)

Get a value at a date:
=FORECAST(A41;B22:B30;A22:A30)

Matrices:

Linear:
TREND(known_data_y, [known_data_x], [new_data_x], [b])

Exponential:
GROWTH(known_data_y, [known_data_x], [new_data_x], [b])


## Google Sheets as database

https://github.com/jsoma/tabletop is now broken, use:

https://developers.google.com/sheets/api/quickstart/nodejs
https://github.com/googleapis/google-api-nodejs-client

https://www.npmjs.com/package/google-spreadsheet

or simpler version:

### Google Sheets CSV as source

1. File → Share → Publish to the web
2. Share each tab as CSV
3. Use `csv-parse` to parse in Node.js
