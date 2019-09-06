// when you're using the builder pattern you are seperating your logic from your data.
// Basic builder pattern steps, Core is a builder, builder is used by director, the builder is implemented by concrete builder.
// Concrete builder is the actually object that is instantiated. Concrete builder makes a product.
// 1st. concrete builder is created and given to the director which has all the logic and or process, executes that to build the product. The Builder defines the steps and the director executes them

// defining the roles

//Director
//1. Uses the Concrete builder, 2. Knows how to build, 3. Client code calls directly 

//Builder
//1. Abstract interface or class, 2. Defines steps, 3. Holds instance of Product

//Concrete Builder
//1. Should be more than one of these, 2. Provides an implementation for interface defiend by the builder, 3. A recipe

//Product
//1. what is being built, should be a complex object. Think of it as one type of thing but with just varying data. i.e. Sandwhichs are the same type of thing but an infinite number of possible sandwhich variations

