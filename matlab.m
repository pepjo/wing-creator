x = [-1 0 3]';
y = [0.5 0 3]';
xx = [-0.5 0 1]';
yy = spline(x,y,xx);
plot(x,y,'o',xx,yy)