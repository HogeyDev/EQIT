RULES:

EXPR > ATOM
	 | PROD
  	 | SUM
	 | FUNC
	 | POW

ATOM > NUM
	 | VAR

NUM  > digits ?(.digits)

VAR  > literal

PROD > EXPR "*" EXPR

SUM  > EXPR "+" EXPR

FUNC > literal "(" EXPR ")"

POW  > EXPR "^" EXPR

============


6*x-4=18+x