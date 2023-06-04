import exports as exp

db_payments=exp.db_payments
rzp_payments=exp.rzp_payments

for i in range (0,len(db_payments)-1):
    temp=db_payments[i]
    for i in range (0,len(rzp_payments)-1):
        if rzp_payments[i]==temp:
            rzp_payments.remove(rzp_payments[i])
            break

print(len(rzp_payments))
print(rzp_payments)