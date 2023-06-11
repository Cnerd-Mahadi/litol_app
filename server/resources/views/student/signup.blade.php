@extends('top.app')
@include('top.topnav_general')
@section('content')
    <section id="home" class="home">
        <div class="container position-relative">
            <div class="row gy-5" data-aos="fade-in">
                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                    <h2>Welcome to <span>Live To Learn</span></h2>
                    <p>Redefine How You Learn With More And More Fun.</p>

                </div>
                <div class="col-lg-6 order-1 order-lg-2">
                    <img src="/img/hero-img.svg" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100">
                </div>
            </div>
        </div>
        <div>
            <div class="icon-boxes position-relative">
                <div class="container position-relative">
                    <div class="row gy-4 mt-5">
                        <h2>Student Form</h2>
                        <div class="registration-form ">
                            <form action="{{ route('signUp') }}" class="form-group" method="post">
                                @csrf
                                <div class="form-icon">
                                    <span><i class="bi bi-person"></i></span>
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control item" id="username" name="username"
                                        value="{{ old('username') }}" placeholder="Username">
                                </div>
                                @error('username')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="text" class="form-control item" id="name" name="name"
                                        value="{{ old('name') }}" placeholder="Full Name">
                                </div>
                                @error('name')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="password" class="form-control item" id="password" name="password"
                                        value="{{ old('password') }}" placeholder="Password">
                                </div>
                                @error('password')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <select class="form-control item" id="gender" name="gender"
                                        value="{{ old('gender') }}">
                                        <option class="form-control item" value="male">Male</option>
                                        <option class="form-control item" value="female">Female</option>
                                    </select>
                                </div>
                                @error('gender')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="text" class="form-control item" id="age" name="age"
                                        value="{{ old('age') }}" placeholder="Age">
                                </div>
                                @error('age')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="text" class="form-control item" id="email" name="email"
                                        value="{{ old('email') }}" placeholder="Email">
                                </div>
                                @error('email')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="text" class="form-control item" id="phone" name="phone"
                                        value="{{ old('phone') }}" placeholder="Phone Number">
                                </div>
                                @error('phone')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="date" class="form-control item" id="dob" name="dob"
                                        value="{{ old('dob') }}" placeholder="Birth Date">
                                </div>
                                @error('dob')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="text" class="form-control item" placeholder="Address" id="address"
                                        name="address" value="{{ old('address') }}">
                                </div>
                                @error('address')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <br>
                                <input type="submit" class="btn btn-block create-account" value="SignUp">

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
@stop
