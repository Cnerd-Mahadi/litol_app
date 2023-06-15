@extends('top.app')
@section('content')
    <section id="home" class="home">
        <div class="container position-relative">
            <div class="row gy-6" data-aos="fade-in">
                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                    <h2>Welcome to <span>Live To Learn</span></h2>
                    <p>Redefine How You Learn With More And More Fun.</p>

                </div>
                <div class="col-lg-6 order-1 order-lg-2">
                    <img src="img/hero-img.svg" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100">
                </div>
            </div>
        </div>
        <div>
            <div class="icon-boxes position-relative">
                <div class="container position-relative">
                    <div class="row gy-4 mt-5">
                        <div class="registration-form">
                            <form action="{{route('login')}}" class="form-group" method="post">
                                @csrf
                                <div class="form-icon">
                                    <span><i class="bi bi-person"></i></span>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control item" id="username" name="username"
                                         placeholder="Username">
                                </div>
                                @error('username')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="password" class="form-control item" id="password" name="password" placeholder="Password">
                                </div>
                                @error('password')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror

                                <div class="row gy-6">
                                    <div class="form-group">
                                        <label class="checkbox-wrap checkbox-primary">Remember Me
                                                        <input type="checkbox" name="remember">
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>

                                <div class="row gy-6" data-aos="fade-in">
                                    <div class="form-group">
                                        <input type="submit" class="btn btn-block create-account" value="Login">
                                    </div>
                                    <div>
                                        <br><br><br>
                                        <p class="text-black-50 mb-0">Don't have an account? <a href="{{ route('signUp') }}" class="text-blue-50 fw-bold">Sign Up</a>
                                        </p>
                                      </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
@stop
