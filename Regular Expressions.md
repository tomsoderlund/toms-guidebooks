Guide: https://regex101.com/#javascript

## Patterns

### Numbers

Line numbers - Markdown style (1. 2.)

	\n\d+\.

List a) b) c)

	\n\w+\)

Find all numbers in [232]

	\[\d*\]

Decimal number:

	([\d.]+)\s+(\S+)


### Other

HTML find all CLASS and ID

	class="[\w\s-]+"	// word or space
	id="[\w\.]+"	// word or period dot

	class="c15" -> class="c[\d]+"

CSV

	\n".*(\n).*"

Find all letters but also - and _

	[\w-_]+

Find all in {{double curly brackets}}

	/\{\{(.*?)\}\}/g

Domain from URL - https://regex101.com/r/MOIFTy/3

	/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/igm


## Reference

	[abc]	A single character: a, b or c
	[^abc]	Any single character but a, b, or c
	[a-z]	Any single character in the range a-z
	[a-zA-Z]	Any single character in the range a-z or A-Z
	^	Start of line
	$	End of line
	\A	Start of string
	\z	End of string
	.	Any single character
	\s	Any whitespace character
	\S	Any non-whitespace character
	\d	Any digit/number
	\D	Any non-digit/number
	\w	Any word character (letter, digit/number, underscore)
	\W	Any non-word character
	\b	Any word boundary character
	(...)	Capture everything enclosed
	(a|b)	a or b
	a?	Zero or one of a
	a*	Zero or more of a
	a+	One or more of a
	a{3}	Exactly 3 of a
	a{3,}	3 or more of a
	a{3,6}	Between 3 and 6 of a

Options:

	i - case insensitive
	m - make dot match newlines
	x - ignore whitespace in regex
	o - perform #{...} substitutions only once
